import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import styles from './style';
import getConfig from '../../helpers/getConfig';

const { sectionPreviewHeight } = getConfig();

/**
 * The ExpandAndCollapse component.
 */
class ExpandAndCollapse extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    children: null,
  };

  /**
   *@param {Object} props The component props.
   */
  constructor(props) {
    super(props);
    this.expandRef = React.createRef();
    this.state = {
      expanded: false,
      showExpandButton: true,
    };
  }

  /**
   * Helper.
   */
  componentDidMount() {
    if (this.expandRef.current.clientHeight < parseInt(sectionPreviewHeight, 10)) {
      this.setState({
        showExpandButton: false,
      });
    }
  }

  /**
   * @param {Object} prevProps previous properties
   * Helper.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.children.props.html !== this.props.children.props.html && this.props.children.props.html !== '') {
      if (this.expandRef.current.clientHeight < parseInt(sectionPreviewHeight, 10)) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          showExpandButton: false,
        });
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          showExpandButton: true,
        });
      }
    }
  }

  /**
   * Handles touch start action.
   */
  handleClick = () => {
    const currentState = this.state.expanded;
    this.setState({
      expanded: !currentState,
    });
  };

  /**
   * Renders.
   * @returns {JSX}
   */
  render() {
    if (!this.state.showExpandButton) {
      return (
        <div>
          <div ref={this.expandRef} className={styles.specialTextNoExpand}>
            {this.props.children}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div ref={this.expandRef} className={`${styles.specialText} ${this.state.expanded ? '-expanded' : ''}`}>
          {this.props.children}
        </div>
        <button type="button" className={styles.expandButton} onClick={this.handleClick}>
          {this.state.expanded ? <I18n.Text string="accordion.expandButton.labelCollapse" /> : <I18n.Text string="accordion.expandButton.labelExpand" />}
        </button>
      </div>
    );
  }
}

export default ExpandAndCollapse;

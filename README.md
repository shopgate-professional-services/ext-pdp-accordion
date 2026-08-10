# Shopgate Connect - Extension pdp-accordion

Extension will display product properties, product description, product reviews and static infos in an accordion view.

## Demo & Examples
[See here](demo/index.md)

## Config

- `accordionItems`: Object of accordion items.
- `sectionBorderColor`: The (upper) border color of a section.
- `showLastSectionBottomBorder`: Whether the last section has a border at to bottom.
- `sectionColor`: The background color of an open section.
- `sectionTextColor`: The text color of an open section.
- `sectionButtonColor`: The button color.
- `sectionButtonTextColor`: The color of the button text.
- `sectionButtonTextSize`: The size of the button text.
- `sectionPreviewHeight`: The height of the section preview in pixel.
- `allowMultipleOpen`: true or false to configure if more than one accordion section can be open.
- `sectionButtonIcon`: An SVG icon replacement for the default section icon (will be tuned by 180° in open state).
- `sectionButtonIconOpen`: An SVG icon for the open state of a section. `sectionButtonIcon` will be used for the closed state.
- `sectionButtonIconFontSize`: Font size of the icon.
- `sectionButtonIconColor`: Color of the icon.
- `animated`: Whether the accordions are animated.
- `productVariablesFromParent`: Whether the product variables in static content are resolved from the parent product instead of the selected variant.
  - `false` (default): values of the selected variant, or the base product when no variant is selected. Missing variant fields fall back to the parent product.
  - `true`: always the values of the parent product.

### Params for accordionItems

- `type`: Define a type. Possible parameters are description, reviews, property and static
  - `description`: Replaces the product description and shows it as an accordion section. Please define only once.
  - `reviews`: Replaces the product reviews and shows them as an accordion section. Please define only once.
  - `property`: Shows a product property as an accordion section. Use the "name" parameter to select the property. Please define one per property.
  - `static`: Shows a static info as an accordion section
- `name`: Will be shown as the headline of the accordion section.
  - For properties enter the name of the property here.
- `headline`: Define a custom headline for the accordion section.
  - Is optional
- `isActive`: Define if an accordion section is opened or closed.
  - Can be true or false
- `preview`: The accordion section will be shown as a preview with a show more / show less button
  - Is optional (default false)
  - Can be true or false
- `sortOrder`: Use an integer to create the sort order. Lowest number will be shown first.
- `info`: Put a random text you want to show here.
  - Only for static info
  - Can contain HTML
  - Can contain product variables: `{productName}`, `{productId}`, `{productNumber}`
  - On variant products the values are taken from the selected variant, unless `productVariablesFromParent` is enabled
  - Product variable values are HTML-escaped
  - Configured scripts and styles are processed

Please orient on the following example configuration for accordion Items.

### Example Configuration for accordionItems

```
[
    {
      "type": "description",
      "name": "Description",
      "isActive": true,
      "sortOrder": 1
    },
    {
      "type": "reviews",
      "name": "Reviews",
      "isActive": false,
      "sortOrder": 4
    },
    {
      "type": "property",
      "name": "collections",
      "headline": "Collections",
      "isActive": true,
      "sortOrder": 2
    },
    {
      "type": "static",
      "name": "Static Info",
      "info": "Here goes your text for {productName}. <br /> SKU: {productNumber}. <br /> Produkt-ID: {productId}",
      "preview": true,
      "isActive": true,
      "sortOrder": 1
    },
    {
      "type": "properties",
      "name": "Properties",
      "isActive": false,
      "sortOrder": 5
    }
  ]
```

### Static HTML updates

After a static block was rendered or updated, the extension dispatches a
`pdpAccordion:updated` browser event. Integrations can listen to this event to
reinitialize third-party widgets after SPA product navigation.

```js
window.addEventListener('pdpAccordion:updated', (event) => {
  const {
    name,
    productId,
    productName,
    productNumber,
  } = event.detail;

  if (name !== 'Static Info') {
    return;
  }

  // Reinitialize the third-party widget here.
});
```

Static accordion HTML may be processed again during PDP lifecycle updates, for
example after SPA product navigation. Third-party integrations should use the
`pdpAccordion:updated` event as their stable hook instead of relying on inline
scripts to execute exactly once.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate Cloud - Extension Boilerplate is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.

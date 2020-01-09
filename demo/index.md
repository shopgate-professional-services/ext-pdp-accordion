# Demo

## With default colors, a default description view and a static text section with no preview
![](01.png)
```json
{
  "sectionColor": "",
  "sectionTextColor": "",
  "sectionButtonColor": "",
  "sectionButtonTextColor": "",
  "sectionButtonTextSize": "",
  "accordionItems": [
    {
      "type": "reviews",
      "name": "Reviews",
      "isActive": false,
      "sortOrder": 2
    },
    {
      "type": "static",
      "name": "Static Info",
      "info": "Here goes your text. <br /> It can contain HTML.",
      "preview": false,
      "isActive": true,
      "sortOrder": 1
    }
  ]
}
```

## With colored buttons and a bigger font size, a closed description section and a property section
![](02.png)
```json
{
  "sectionColor": "",
  "sectionTextColor": "",
  "sectionButtonColor": "#ffb800",
  "sectionButtonTextColor": "#fff",
  "sectionButtonTextSize": "18",
  "accordionItems": [
    {
      "type": "description",
      "name": "Description",
      "isActive": false,
      "sortOrder": 2
    },
    {
      "type": "reviews",
      "name": "Reviews",
      "isActive": true,
      "sortOrder": 3
    },
    {
      "type": "property",
      "name": "Collections",
      "headline": "Collection",
      "isActive": true,
      "sortOrder": 1
    }
  ]
}
```

## With colored sections, a closed description section view and a long static text with preview botton("Mehr anzeigen"/"Show more")
![](03.png)
```json
{
  "sectionColor": "#8a9294",
  "sectionTextColor": "#fff",
  "sectionButtonColor": "#364042",
  "sectionButtonTextColor": "#fff",
  "sectionButtonTextSize": "",
  "accordionItems": [
    {
      "type": "description",
      "name": "Description",
      "isActive": false,
      "sortOrder": 2
    },
    {
      "type": "reviews",
      "name": "Reviews",
      "isActive": false,
      "sortOrder": 3
    },
    {
      "type": "static",
      "name": "Static Info",
      "info": "Here goes your text. <br /> It can contain HTML. And a very long text.<br /> And a very long text.<br /> And a very long text.<br /> And a very long text.<br /> And a very long text.<br /> And a very long text.",
      "preview": true,
      "isActive": true,
      "sortOrder": 1
    }
  ]
}
```
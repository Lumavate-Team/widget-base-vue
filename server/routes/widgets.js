import { Router } from 'express'
import axios from 'axios'
import { signUrl } from '@lumavate/request-signer'
import * as designer from '@lumavate/designer-properties'

import auth from '../middleware/auth';

const router = Router()

router.get('/discover/health', function (req, res, next) {
  res.json('OK')
})

router.get('/discover/properties', function (req, res, next) {
  const textCommon = {
    classification: 'Text',
    section: 'Properties',
  }
  const boolCommon = {
    classification: 'Boolean',
    section: 'Properties',
  }
  const selectionCommon = {
    classification: 'Selection',
    section: 'Properties',
  }
  const otherCommon = {
    classification: 'Other',
    section: 'Properties',
  }

  res.json([
    { ...(new designer.TextProperty()), ...textCommon, ...{
      label: 'My Text',
      name: 'myText'
    }},
    { ...(new designer.TextProperty()), ...textCommon, ...{
      label: 'My Text Area',
      name: 'myTextArea',
      options: {
        rows: 5
      }
    }},
    { ...(new designer.TranslatedTextProperty()), ...textCommon, ...{
      label: 'My Translated Text',
      name: 'myTranslatedText'
    }},
    { ...(new designer.TranslatedTextProperty()), ...textCommon, ...{
      label: 'My Translated Text Area',
      name: 'myTranslatedTextArea',
      options: {
        rows: 5
      }
    }},
    { ...(new designer.NumericProperty()), ...textCommon, ...{
      label: 'My Numeric Text',
      name: 'myNumericText',
      default: 1,
      options: {
        min: 1,
        max: 5
      }
    }},
    { ...(new designer.CheckboxProperty()), ...boolCommon, ...{
      label: 'My Checkbox',
      name: 'myCheckbox'
    }},
    { ...(new designer.ToggleProperty()), ...boolCommon, ...{
      label: 'My Toggle',
      name: 'myToggle'
    }},
    { ...(new designer.DropdownProperty()), ...selectionCommon, ...{
      label: 'My Dropdown',
      name: 'myDropdown',
      default: 'None',
      options: {
        dd1: 'Dropdown 1',
        dd2: 'Dropdown 2',
        dd3: 'Dropdown 3'
      }
    }},
    { ...(new designer.MultiSelectProperty()), ...selectionCommon, ...{
      label: 'My MultiSelect',
      name: 'myMultiSelect',
      default: 'None',
      options: [
        { value: 'ms1', displayValue: 'MultiSelect 1' },
        { value: 'ms2', displayValue: 'MultiSelect 2' },
        { value: 'ms3', displayValue: 'MultiSelect 3' }
      ]
    }},
    { ...(new designer.ComponentProperty()), ...{
      classification: 'Component',
      section: 'Properties',
      label: 'My Component',
      name: 'myComponent',
      default: { componentType: 'firstComponent' },
      options: {
        categories: [ 'myComponent' ],
        components: [{
            ...(new designer.Component()), ...{
            category: 'myComponent',
            displayName: 'First Component',
            icon: 'a',
            label: 'First Component',
            properties: [{
              ...(new designer.TextProperty()), ...textCommon, ...{
                label: 'My Text',
                name: 'myText'
              }}
            ],
            section: 'Properties',
            type: 'firstComponent'
          }
        }],
      }
    }},
    { ...(new designer.ColorProperty()), ...otherCommon, ...{
      label: 'My Color',
      name: 'myColor'
    }},
    { ...(new designer.ImageProperty()), ...otherCommon, ...{
      label: 'My Image',
      name: 'myImage'
    }},
    { ...(new designer.PageLinkProperty()), ...otherCommon, ...{
      label: 'My Page Link',
      name: 'myPageLink'
    }}
  ])
})

router.use('/instances', auth)

router.get('/instances/:id/data', async function (req, res, next) {
  const signedPath = await signUrl({
    method: 'GET',
    path: `/pwa/v1/widget-instances/${req.params.id}`
  })

  const axRes = await axios.get(`${process.env.BASE_URL}${signedPath}`, {
    headers: res.locals.authHeader
  })

  res.json(axRes.data.payload.data)
})

export default router

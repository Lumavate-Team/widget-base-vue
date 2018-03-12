import * as designer from '@lumavate/designer-properties'

const chartCommon= {
	classification: 'Chart',
	section: 'Properties',
}
const displayCommon = {
	classification: 'Display',
	section: 'Properties',
}

var properties = [
    { ...(new designer.TextProperty()), ...displayCommon, ...{
      label: 'Bar Chart Color',
      name: 'barColor'
    }},
    { ...(new designer.TextProperty()), ...chartCommon, ...{
      label: 'Start Date',
      name: 'startDate'
    }},
    { ...(new designer.TextProperty()), ...chartCommon, ...{
      label: 'End Date',
      name: 'endDate'
    }},
    { ...(new designer.TextProperty()), ...chartCommon, ...{
      label: 'Time Format',
      name: 'timeFormat',
			default: 'HH:MM:SS',
    }},
    { ...(new designer.TextProperty()), ...chartCommon, ...{
      label: 'Serial Numbers',
      name: 'serialNumbers',
			options: {
				rows: 5
			}
    }},
    { ...(new designer.NumericProperty()), ...chartCommon, ...{
      label: 'Font Size (px)',
      name: 'fontSize',
      default: 8,
      options: {
        min: 4,
        max: 50
      }
    }},
    { ...(new designer.TextProperty()), ...chartCommon, ...{
      label: 'Font Family',
      name: 'fontfamily',
			default: 'Arial',
    }},
    { ...(new designer.TextProperty()), ...chartCommon, ...{
      label: 'Chart Type',
      name: 'chartType',
      default: 'bar',
    }},
  ];
export default properties

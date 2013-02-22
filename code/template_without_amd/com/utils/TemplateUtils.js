var TemplateUtils = {};

TemplateUtils._templates = {};

/**
 * process a handlebar template
 * @param template, name string to the template without the extension
 * @param params, object to process the handlebar template
 * @param onTemplateHandler, function to received the post processed html of the template
 */
TemplateUtils.getTemplate = function(template, params, onTemplateHandler)
{
	if(TemplateUtils._templates.hasOwnProperty(template)){
		var templateData = TemplateUtils._templates[template];
		TemplateUtils._onTemplateLoaded(templateData, params, onTemplateHandler);
	}
	
	$.ajax({
		type: "GET",
		url: Constants.FOLDER_TEMPLATES + template + Constants.EXTENSION_TEMPLATES,
		async: false,
		cache: false,
		success: function(data){
			TemplateUtils._templates[template] = data;
			TemplateUtils._onTemplateLoaded(data, params, onTemplateHandler);
		}
	});	
}

/**
 * when a template is loaded
 * @param templateData, template html string
 * @param params, object to process the handlebar template
 * @param onTemplateHandler, function to received the post processed html of the template
 */
TemplateUtils._onTemplateLoaded = function(templateData, params, onTemplateHandler)
{
	var template = Handlebars.compile(templateData);
	var html = template(params);
	
	if(onTemplateHandler){
		onTemplateHandler(html);
	}
}


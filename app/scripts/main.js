require.config({
	paths: {
		howler: '../components/howler/howler',
		jquery: '../components/jquery/jquery',
		requirejs: '../components/requirejs/require',
		momentjs: '../components/momentjs/moment',
		handlebars: '../components/handlebars.js/lib/handlebars'
	}
});

require(['jquery'], function ($) {
	'use strict';

	// $.getJSON('http://www.google.com/calendar/feeds/'+feedUrl+'/public/basic?alt=json-in-script&callback=?', function(data){
	$.getJSON('https://spreadsheets.google.com/feeds/list/0AkdUPTzjR9_pdG82TjZtNGxpTEN0WUFocVNkVFVLQXc/od6/public/values?alt=json-in-script&callback=?', function(data){
		console.log(data);
		var entries = data.feed.entry,
				$entries = $('<ul>').attr('class','schedule--entries');

		(function () {
			var i, $entry, $entryMeta, $entryDate, $entryTime, $entryTitle, $entryLocation, $entryContent, $entryDescription;

			for (i in entries) {
				$entry = $('<li>').attr('class','schedule--entry');
				$entryContent = $('<div>').attr('class','content');
				$entryMeta = $('<div>').attr('class','meta');

				$entryDate = $('<div>').attr('class','date').text(entries[i].gsx$date.$t);
				$entryTime = $('<div>').attr('class','time').text(entries[i].gsx$starttime.$t + ' to ' + entries[i].gsx$endtime.$t);
				$entryMeta.append($entryDate);
				$entryMeta.append($entryTime);

				$entryTitle = $('<h3>').attr('class','title').text(entries[i].gsx$title.$t);
				$entryLocation = $('<div>').attr('class','location').html(entries[i].gsx$location.$t);
				$entryDescription = $('<p>').attr('class','description').html($('<pre>').html(entries[i].gsx$description.$t.replace(/\r\n/g,'<br>')));
				$entryContent.append($entryTitle);
				$entryContent.append($entryLocation);
				$entryContent.append($entryDescription);

				$entry.append($entryMeta).append($entryContent);
				$entries.append($entry);
			}
		})();

		$('#schedule').html('').append($('<h2 class="section-header">').text(data.feed.title.$t)).append($entries);
	});
});
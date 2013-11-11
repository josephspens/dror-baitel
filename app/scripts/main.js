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

	var feedUrl = 'tm6trusik9ch6iu4cejq7j5vng%40group.calendar.google.com';

	$.getJSON('http://www.google.com/calendar/feeds/'+feedUrl+'/public/basic?alt=json-in-script&callback=?', function(data){
		var feed = data.feed,
				title = feed.title.$t,
				entries = feed.entry,
				$title = $('<h2>').text(title),
				$entries = $('<ul>').attr('class','schedule--entries');

		(function () {
			var i, when, time, date, where, $entry, $entryMeta, $entryDate, $entryTime, $entryTitle, $entryLocation, $entryContent;

			for (i in entries) {
				when = entries[i].summary.$t.split('<br>')[0].replace(/(&nbsp;)(\n|\r)(EST|EDT)/,'').replace('When: ','');
				date = when.slice(0, when.search(/2[0-9]{3}/)+4).trim();
				time = when.replace(date,'').trim();
				where = entries[i].summary.$t.split('<br>')[2].replace(/(\n|\r)/,'').replace('Where: ','');
				$entry = $('<li>').attr('class','schedule--entry');
				$entryTitle = $('<h3>').attr('class','title').html(entries[i].title.$t);
				$entryLocation = $('<div>').attr('class','location').html(where);
				$entryDate = $('<div>').attr('class','date').html(date);
				$entryTime = $('<div>').attr('class','time').html(time);
				$entryMeta = $('<div>').attr('class','meta').html($entryDate).append($entryTime);
				$entryContent = $('<div>').attr('class','content').append($entryTitle);
				if (where.search('Event Status:') !== 0) {
					$entryContent.append($entryLocation);
				}

				$entry.append($entryMeta).append($entryContent);
				$entries.append($entry);
			}
		})();

		$('#schedule').html('').append($title).append($entries);
	});
});
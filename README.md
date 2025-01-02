# calendar

A calendar website that allows you to plan at a scope of a month. 

I love using apple calendar, but at the scope of month, it automatically fold each event to single line (if something is too long, it become "abcdefghyjkml...") Hence I start from scratch and build this website.

This website allows you to add, modify and delete events. The event persist even if you flip to other month and flip back. 

However, the data is currently stored in a local data base in your browser. Hence you will not see your events across multiple device. Moreover, if you clear the browser's history, you'll loose your events. I am working on solving this issue using online database, but that takes some extra debugging. 

I've also add a functionality that export the entire calendar to image, so you could save/distribute it. This function is similar to a screen shot, so if you are using it through a phone, the calendar and the exported image will both be disproportional. 

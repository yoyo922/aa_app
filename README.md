Agency Analytics app
Created by: Peter Zhou 9/15/2022

---------------------
 
App developed using reactJS typescript template, Less css preprocessor and openweather API
--------------------

how to run in develop, replace this npm run start script with this back-up run command. this will the less css watcher and compile the less into css on the fly during development

back-up run command: 
"start": "concurrently --kill-others \"less-watch-compiler --config less-watcher.config.json\" \"react-scripts start\"",

---------------------
Notes:

Weather may not exactly match google/weather network. The temperature is a average of the 24H and the weather condition is for that day at 12:00 noon
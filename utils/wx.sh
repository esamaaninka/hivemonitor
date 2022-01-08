#!/bin/sh

curl "https://api.openweathermap.org/data/2.5/weather?id=634963&appid=59b78142d618459a21c982b7a368a0f8&units=metric" > /tmp/wx-data.json

WX_STATION_ID=$(cat /tmp/wx-data.json | jq '.name')
WX_TEMP_C=$(cat /tmp/wx-data.json | jq '.main.temp')
WX_WIND_DIR=$(cat /tmp/wx-data.json | jq '.wind.deg')
WX_WIND_MPH=$(cat /tmp/wx-data.json | jq '.wind.speed')
WX_RELATIVE_HUMIDITY=$(cat /tmp/wx-data.json | jq '.main.pressure')
WX_PRESSURE_MB=$(cat /tmp/wx-data.json | jq '.main.humidity')


 echo "WS Station ID     " $WX_STATION_ID
 echo "WS Temperature    " $WX_TEMP_C
 echo "WS Wind Direction " $WX_WIND_DIR
 echo "WS Wind Speed     " $WX_WIND_MPH
 echo "WS Wind Gust      " $WX_WIND_GUST_MPH
 echo "WS Dewpoint       " $WX_DEWPOINT_F
 echo "WS Humidity       " $WX_RELATIVE_HUMIDITY
 echo "WS Pressure       " $WX_PRESSURE_MB
 echo "WS Precip Today   " $WX_PRECIP_TODAY_IN

#,.main.pressure, .main.humidity'
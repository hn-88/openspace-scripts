# Notes
* for openspace to focus on a planet without making the camera rotate around it - In the settings > Navigation Handler there is
  a  "Follow Anchor Node Rotation" and a "Follow Anchor Node Rotation Distance", smaller distance = the closer you can be to the object before following its rotation - 
https://openspacesupport.slack.com/archives/C055D75TJ9K/p1718704511126989?thread_ts=1718701308.415139&cid=C055D75TJ9K

* For changing the length of the planet trails (orbit paths) - https://docs.openspaceproject.com/releases-v0.20/using-openspace/scripting/console/index.html
for getting the trails length property,
checking logs/ScriptLog.txt
openspace.setPropertyValue("{planetTrail_solarSystem}.Renderable.Enabled", false)
works.
It is case sensitive.
In Trail Appearance, currently the default is 
LineLength=1
Line Fade Amount is a small amount - something like 0.25. 
Increasing Line Fade Amount to 0.4 increases the length of the trail shown.
`openspace.setPropertyValue("{planetTrail_solarSystem}.Renderable.Appearance.LineFadeAmount", 0.4)`
in the console scripting window by hitting ``` ` ``` (backtick) key
We need to again close the console window by hitting \` again, otherwise keyboard shortcuts like `t`
to toggle all trails won't work - the keystrokes will be captured by the console.

* The Sun size was increased to 36x and `Sun glare` was turned off for the Mercury + Sun clip. 

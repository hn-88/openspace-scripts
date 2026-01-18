### Conversation with Gemini 3 in aistudio.google.com
_In OpenSpace, we can show a screenspace renderable with the current time in our timezone with something like_
```
local Item = {
  Type = "ScreenSpaceDate",
  Identifier = "ScreenSpaceDate_Example_Timezone",
  Name = "ScreenSpace Date Example - Timezone",
  TimeFormat = "YYYY MON DD HR:MN:SC.### PDT ::UTC-7"
}
```
_Can we adapt this to Martian time?_

No, the standard `ScreenSpaceDate` renderable in OpenSpace is hardcoded to display Earth time (UTC) and does not natively support Martian time (such as MTC or MSD).

To display Martian time, you must use a `ScreenSpaceText` renderable and update its text property continuously using a Lua script.

Here is the complete solution to implement a Martian Clock.

### 1. Define the ScreenSpaceText Item
Replace your `ScreenSpaceDate` item in your asset file with a `ScreenSpaceText` item. This creates a label on the screen that we can control via script.

```lua
local MarsClock = {
  Type = "ScreenSpaceText",
  Identifier = "MarsClock",
  Name = "Mars Clock",
  Text = "MTC: Calculating...", 
  FontSize = 50,
  Position = {0.8, 0.9}, -- Adjust X,Y position as needed
  Color = {1.0, 0.4, 0.2} -- Martian Orange
}

openspace.addScreenSpaceRenderable(MarsClock)
```

### 2. Create the Lua Update Script
You need a Lua script to calculate the Martian Sol Date (MSD) and Coordinated Mars Time (MTC) based on the current simulation time.

Save the following code as `mars_time.lua` (or include it directly in your asset).

```lua
local function updateMarsTime()
    -- 1. Get current simulation time (Seconds since J2000)
    local j2000_seconds = openspace.time.currentTime()
    
    -- 2. Convert to Julian Date
    -- J2000 epoch is JD 2451545.0
    -- 86400 seconds in a day
    local jd_ut = 2451545.0 + (j2000_seconds / 86400.0)
    
    -- 3. Calculate Martian Sol Date (MSD)
    -- Formula based on Allison & McEwen (2000)
    -- Length of Martian sol is 1.027491252 Earth days
    -- Reference MSD is 44796.0 at J2000
    local msd = (jd_ut - 2451545.0) / 1.027491252 + 44796.0 - 0.00096

    -- 4. Calculate Coordinated Mars Time (MTC)
    -- Extract the fractional part of the MSD to get the time of day
    local msd_fraction = msd % 1.0
    local mtc_hours = msd_fraction * 24.0
    local mtc_minutes = (mtc_hours % 1.0) * 60.0
    local mtc_seconds = (mtc_minutes % 1.0) * 60.0

    -- 5. Format the string (e.g., "Sol 52000 12:30:45 MTC")
    local timeString = string.format("Sol %d  %02d:%02d:%02d MTC", 
        math.floor(msd), 
        math.floor(mtc_hours), 
        math.floor(mtc_minutes), 
        math.floor(mtc_seconds)
    )

    -- 6. Update the ScreenSpaceText
    openspace.setPropertyValueSingle("ScreenSpace.MarsClock.Text", timeString)
end

-- Register the function to run repeatedly (e.g., every frame or every 0.1s)
openspace.scriptScheduler.registerRepeatedScript("UpdateMarsClock", updateMarsTime, 0)
```

### 3. Integrate into your Asset
In your `.asset` file, add the command to load/run this script after adding the renderable.

```lua
local assetHelper = asset.require('util/asset_helper')

-- ... (Define and add MarsClock Item as above) ...

asset.onInitialize(function()
    openspace.addScreenSpaceRenderable(MarsClock)
    
    -- Option A: If the script is in a separate file
    -- openspace.scriptScheduler.loadFile("path/to/mars_time.lua")
    
    -- Option B: Define and register the function directly here
    -- (Copy the lua code from Step 2 inside this function)
end)

asset.onDeinitialize(function()
    openspace.removeScreenSpaceRenderable("MarsClock")
    openspace.scriptScheduler.removeRepeatedScript("UpdateMarsClock")
end)
```

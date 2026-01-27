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
_Error_
```
- Lua: When initializing '/Users/hari/Downloads/OpenSpace-minimal-daily-mac/data/assets/examples/screenspacerenderable/screenspacedate/date_martian.asset': ...screenspacerenderable/screenspacedate/date_martian.asset:52: attempt to call a nil value (field 'registerRepeatedScript')
```
The error occurs because **`openspace.scriptScheduler.registerRepeatedScript` does not exist** in the API you are using. The function has been moved or is simply available as `openspace.registerRepeatedScript`.

Additionally, there is a secondary issue: `registerRepeatedScript` expects a **String** (the name of the command to run) as the second argument, not a Lua function object. Because it runs repeatedly in the global scope, it cannot "see" your `local` function after the asset file finishes loading.

Here is the corrected and tested code structure.

### Corrected Code (`date_martian.asset`)

```lua
-- 1. Define the renderable
local MarsClock = {
  Type = "ScreenSpaceText",
  Identifier = "MarsClock",
  Name = "Mars Clock",
  Text = "MTC: Calculating...",
  FontSize = 50,
  Position = {0.8, 0.9},
  Color = {1.0, 0.4, 0.2}
}

-- 2. Define the update function GLOBALLY so OpenSpace can find it later.
-- We use a unique name (MyMars_Update) to avoid conflicts with other scripts.
function MyMars_Update()
    -- Get time
    local j2000 = openspace.time.currentTime()
    local jd_ut = 2451545.0 + (j2000 / 86400.0)

    -- MSD Calculation (Allison & McEwen 2000)
    local msd = (jd_ut - 2451545.0) / 1.027491252 + 44796.0 - 0.00096

    -- MTC Calculation
    local msd_fraction = msd % 1.0
    local mtc_hours = msd_fraction * 24.0
    local mtc_minutes = (mtc_hours % 1.0) * 60.0
    local mtc_seconds = (mtc_minutes % 1.0) * 60.0

    local timeString = string.format("Sol %d  %02d:%02d:%02d MTC", 
        math.floor(msd), 
        math.floor(mtc_hours), 
        math.floor(mtc_minutes), 
        math.floor(mtc_seconds)
    )

    -- Safety check: Ensure the renderable exists before setting text
    if openspace.hasProperty("ScreenSpace.MarsClock.Text") then
        openspace.setPropertyValueSingle("ScreenSpace.MarsClock.Text", timeString)
    end
end

asset.onInitialize(function()
  openspace.addScreenSpaceRenderable(MarsClock)
  
  -- Run once immediately
  MyMars_Update()

  -- 3. Register the script.
  -- CORRECT API: openspace.registerRepeatedScript (not scriptScheduler)
  -- CORRECT ARG: Pass the string "MyMars_Update()" (not the function object)
  openspace.registerRepeatedScript("UpdateMarsClock", "MyMars_Update()", 0)
end)

asset.onDeinitialize(function()
  -- Remove the script
  openspace.removeRepeatedScript("UpdateMarsClock")
  
  -- Remove the renderable
  openspace.removeScreenSpaceRenderable("MarsClock")
end)
```

### Key Changes Made:
1.  **API Fix:** Changed `openspace.scriptScheduler.registerRepeatedScript` to `openspace.registerRepeatedScript` (and `openspace.removeRepeatedScript`).
2.  **Scope Fix:** Changed `local function updateMarsTime` to `function MyMars_Update` (Global). The scheduler runs in the global Lua environment, so it cannot see local variables from your asset file.
3.  **Type Fix:** Passed the **string** `"MyMars_Update()"` to the register function, rather than the function variable itself.

{
  "actions": [
    {
      "documentation": "Toggle trails on or off for satellites around Earth",
      "gui_path": "/Earth",
      "identifier": "profile.keybind.0",
      "is_local": false,
      "name": "Toggle satellite trails",
      "script": "local list = openspace.getProperty('{earth_satellites}.Renderable.Enabled'); for _,v in pairs(list) do openspace.setPropertyValueSingle(v, not openspace.getPropertyValue(v)) end"
    },
    {
      "documentation": "Refocuses the camera on the ISS",
      "gui_path": "/Earth",
      "identifier": "profile.keybind.1",
      "is_local": false,
      "name": "Focus ISS",
      "script": "openspace.setPropertyValueSingle('NavigationHandler.OrbitalNavigator.Aim', '');openspace.setPropertyValueSingle('NavigationHandler.OrbitalNavigator.Anchor', 'ISS');openspace.setPropertyValueSingle('NavigationHandler.OrbitalNavigator.RetargetAnchor', nil);"
    },
    {
      "documentation": "Retargets the camera on Earth",
      "gui_path": "/Earth",
      "identifier": "profile.keybind.2",
      "is_local": false,
      "name": "Focus on Earth",
      "script": "openspace.setPropertyValueSingle('NavigationHandler.OrbitalNavigator.Aim', '');openspace.setPropertyValueSingle('NavigationHandler.OrbitalNavigator.Anchor', 'Earth')openspace.setPropertyValueSingle('NavigationHandler.OrbitalNavigator.RetargetAnchor', nil);"
    }
  ],
  "additional_scripts": [
    "openspace.setPropertyValueSingle(\"NavigationHandler.OrbitalNavigator.RetargetAnchorInterpolationTime\", 5)",
    "openspace.setPropertyValue(\"Scene.*Trail.Renderable.Enabled\", false)",
    "openspace.setPropertyValueSingle(\"Scene.ISS_trail.Renderable.Enabled\", false)",
    "openspace.setPropertyValueSingle(\"NavigationHandler.OrbitalNavigator.StereoscopicDepthOfFocusSurface\", 500000)\t  openspace.setPropertyValueSingle(\"Scene.Mercury.Renderable.PerformShading\", false)\t  openspace.setPropertyValueSingle(\"Scene.Venus.Renderable.PerformShading\", false)\t  openspace.setPropertyValueSingle(\"Scene.Earth.Renderable.PerformShading\", false)\t  openspace.setPropertyValueSingle(\"Scene.Mars.Renderable.PerformShading\", false)\t  openspace.setPropertyValueSingle(\"Scene.Jupiter.Renderable.PerformShading\", false)\t  openspace.setPropertyValueSingle(\"Scene.Saturn.Renderable.PerformShading\", false)  openspace.setPropertyValueSingle(\"Scene.Uranus.Renderable.PerformShading\", false)\t  openspace.setPropertyValueSingle(\"Scene.Neptune.Renderable.PerformShading\", false)\t  ",
    "openspace.setPropertyValueSingle(\"Scene.Moon.Renderable.PerformShading\", false)",
    "  openspace.addScreenSpaceRenderable({ Identifier = openspace.makeIdentifier(\"waxing-crescent-moon\"), Type = \"ScreenSpaceImageLocal\", TexturePath = \"C:/Users/Phoenix/Documents/OpenSpace/User/data/img/waxing-crescent-moon.jpg\"   })",
    "  openspace.addScreenSpaceRenderable({ Identifier = openspace.makeIdentifier(\"waxing-gibbous-moon\"), Type = \"ScreenSpaceImageLocal\",  TexturePath = \"C:/Users/Phoenix/Documents/OpenSpace/User/data/img/waxing-gibbous-moon.jpg\" })",
    "  openspace.addScreenSpaceRenderable({ Identifier = openspace.makeIdentifier(\"Phases-of-the-Moon\"), Type = \"ScreenSpaceImageLocal\",  TexturePath = \"C:/Users/Phoenix/Documents/OpenSpace/User/data/img/Phases-of-the-Moon.png\" })",
    "  openspace.addScreenSpaceRenderable({ Identifier = openspace.makeIdentifier(\"Lunar-Eclipse\"), Type = \"ScreenSpaceImageLocal\",  TexturePath = \"C:/Users/Phoenix/Documents/OpenSpace/User/data/img/Lunar Eclipse.png\" })",
    "  openspace.addScreenSpaceRenderable({ Identifier = openspace.makeIdentifier(\"Solar-Eclipse\"), Type = \"ScreenSpaceImageLocal\",  TexturePath = \"C:/Users/Phoenix/Documents/OpenSpace/User/data/img/Solar Eclipse.jpeg\" })",
    "  openspace.addScreenSpaceRenderable({ Identifier = openspace.makeIdentifier(\"Happy_Birthday\"), Type = \"ScreenSpaceImageLocal\",  TexturePath = \"C:/Users/Phoenix/Documents/OpenSpace/User/data/img/Happy Birthday.png\" })",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  "assets": [
    "base",
    "base_blank",
    "scene/milkyway/exoplanets/exoplanets_data",
    "scene/milkyway/exoplanets/exoplanets_textures",
    "scene/solarsystem/missions/apollo/insignias_map",
    "scene/solarsystem/planets/earth/earth",
    "scene/solarsystem/planets/earth/satellites/satellites"
  ],
  "camera": {
    "altitude": 17000000.0,
    "anchor": "Earth",
    "latitude": 58.5877,
    "longitude": 16.1924,
    "type": "goToGeo"
  },
  "delta_times": [
    1.0,
    5.0,
    30.0,
    60.0,
    300.0,
    1800.0,
    3600.0,
    43200.0,
    86400.0,
    604800.0,
    1209600.0,
    2592000.0,
    5184000.0,
    7776000.0,
    15552000.0,
    31536000.0,
    63072000.0,
    157680000.0,
    315360000.0,
    630720000.0
  ],
  "keybindings": [
    {
      "action": "profile.keybind.0",
      "key": "S"
    },
    {
      "action": "profile.keybind.1",
      "key": "I"
    },
    {
      "action": "profile.keybind.2",
      "key": "HOME"
    }
  ],
  "mark_nodes": [
    "Earth",
    "Mars",
    "Moon",
    "Sun",
    "Venus",
    "ISS"
  ],
  "meta": {
    "author": "OpenSpace Team",
    "description": "Default OpenSpace Profile. Adds Earth satellites not contained in other profiles.",
    "license": "MIT License",
    "name": "Default",
    "url": "https://www.openspaceproject.com",
    "version": "1.0"
  },
  "properties": [
    {
      "name": "{earth_satellites}.Renderable.Enabled",
      "type": "setPropertyValue",
      "value": "false"
    },
    {
      "name": "NavigationHandler.PathNavigator.RotationSpeedFactor",
      "type": "setPropertyValueSingle",
      "value": "0.1"
    },
    {
      "name": "NavigationHandler.PathNavigator.SpeedScale",
      "type": "setPropertyValueSingle",
      "value": "0.4"
    },
    {
      "name": "NavigationHandler.PathNavigator.ApplyIdleBehaviorOnFinish",
      "type": "setPropertyValueSingle",
      "value": "true"
    },
    {
      "name": "Scene.Moon.Scale.Scale",
      "type": "setPropertyValueSingle",
      "value": "5"
    },
    {
      "name": "Scene.CardinalDirectionSphere.Renderable.Fade",
      "type": "setPropertyValueSingle",
      "value": "1"
    },
    {
      "name": "Scene.Moon.Renderable.AmbientIntensity",
      "type": "setPropertyValueSingle",
      "value": "3"
    }
  ],
  "time": {
    "is_paused": false,
    "type": "relative",
    "value": "-1d"
  },
  "version": {
    "major": 1,
    "minor": 3
  }
}
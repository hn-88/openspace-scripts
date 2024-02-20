var TimeButtons = {
  title: "Time Controls",
  buttons: {
    'Toggle Pause (Interpolated)': () => { 
      openspace.time.interpolateTogglePause();
    },
    'Toggle Pause (Immediate)': async () => { 
      openspace.time.togglePause();
    },
    'Realtime': () => { 
      openspace.time.interpolateDeltaTime(1)
    },
    '5 sec/sec': () => { 
      openspace.time.interpolateDeltaTime(5)
    },    
    '30 sec/sec': () => { 
      openspace.time.interpolateDeltaTime(30)
    },    
    '1 min/sec': () => { 
      openspace.time.interpolateDeltaTime(60)
    },    
    '10 min/sec': () => { 
      openspace.time.interpolateDeltaTime(600)
    },    
    '1 hr/sec': () => { 
      openspace.time.interpolateDeltaTime(3600)
    },    
    '4 hr/sec': () => { 
      openspace.time.interpolateDeltaTime(14400)
    },    
    '12 hr/sec': () => { 
      openspace.time.interpolateDeltaTime(43200)
    },    
    '1 day/sec': () => { 
      openspace.time.interpolateDeltaTime(86400)
    },    
    '7 day/sec': () => { 
      openspace.time.interpolateDeltaTime(604800)
    },    
    '1 mo/sec': () => { 
      openspace.time.interpolateDeltaTime(2592000)
    },
    '1 yr/sec': () => { 
      openspace.time.interpolateDeltaTime(31536000)
    },
	'Go to date': () => {
		openspace.time.interpolateTime("2020-09-15T16:21:06.491")
	}
  }
};

var myButtons = {
  title: "OPIS",
  buttons: {
	'Setup before Show': () => {
	  openspace.sessionRecording.startPlayback("starting point.osrec",false)
	}, 
	'Orbit Earth': () => {
	  openspace.sessionRecording.startPlayback("Orbit Earth.osrec",false)
	},
	'Fly to Moon': () => {
	  openspace.pathnavigation.flyTo("Moon")
	},
	'Fly to Mercury': () => {
	  openspace.pathnavigation.flyTo("Mercury")
	},
	'Fly to Venus': () => {
	  openspace.pathnavigation.flyTo("Venus")
	},
	'Fly to Mars': () => {
	  openspace.pathnavigation.flyTo("Mars")
	},
	'Fly to Jupiter': () => {
	  openspace.pathnavigation.flyTo("Jupiter")
	},
	'Fly to Saturn': () => {
	  openspace.pathnavigation.flyTo("Saturn")
	},
	'Fly to Uranus': () => {
	  openspace.pathnavigation.flyTo("Uranus")
	},
	'Fly to Neptune': () => {
	  openspace.pathnavigation.flyTo("Neptune")
	},
	'Fly to Pluto': () => {
	  openspace.pathnavigation.flyTo("Pluto")
	},
	'Fly to GJ 581': () => {
	  openspace.sessionRecording.startPlayback("Exoplanet.osrec",false)
	},
	'Fly to TRAPPIST': () => {
	  openspace.sessionRecording.startPlayback("Exoplanet 2.osrec",false)
	},
	'Fly Home':() => {
	  openspace.sessionRecording.startPlayback("Flying Home v2.osrec",false)
	},
  }
}

var VisualButtons = {
  title: "Visual",
  buttons: {
    'Hide All Trails': async () => { 
        const duration = 1;
        openspace.setPropertyValue("Scene.*Trail.Renderable.Opacity", 0, 1)
        setTimeout(() => {
          openspace.setPropertyValue("Scene.*Trail.Renderable.Enabled", false)  
        }, duration * 1000)
    },
    'Show All Trails': async () => { 
        const duration = 1;
        openspace.setPropertyValue("Scene.*Trail.Renderable.Enabled", true)  
        openspace.setPropertyValue("Scene.*Trail.Renderable.Opacity", 1, 1)
    },
    'Fade screen to/from black': async () => { 
      var blackoutFactor = await openspace.getPropertyValue('RenderEngine.BlackoutFactor');
      if (blackoutFactor[1] > 0.5) {
        openspace.setPropertyValueSingle('RenderEngine.BlackoutFactor', 0.0, 3)
      } else {
        openspace.setPropertyValueSingle('RenderEngine.BlackoutFactor', 1.0, 3)
      }
    },
  }
};

var FrictionButtons = {
  title: "Camera Friction",
  buttons: {
    'Toggle Rotation friction': async () => { 
      var isEnabled = await openspace.getPropertyValue('NavigationHandler.OrbitalNavigator.Friction.RotationalFriction');
      openspace.setPropertyValueSingle('NavigationHandler.OrbitalNavigator.Friction.RotationalFriction', !isEnabled[1]);
    },
    'Toggle Zoom friction': async () => { 
      var isEnabled = await openspace.getPropertyValue('NavigationHandler.OrbitalNavigator.Friction.ZoomFriction');
      openspace.setPropertyValueSingle('NavigationHandler.OrbitalNavigator.Friction.ZoomFriction', !isEnabled[1]);
    },
    'Toggle Roll friction': async () => { 
      var isEnabled = await openspace.getPropertyValue('NavigationHandler.OrbitalNavigator.Friction.RollFriction');
      openspace.setPropertyValueSingle('NavigationHandler.OrbitalNavigator.Friction.RollFriction', !isEnabled[1]);
    },
  }
};

var SystemButtons = {
  title: "System",
  buttons: {
    'Toggle Dashboard': async () => { 
      var isEnabled = await openspace.getPropertyValue('Dashboard.IsEnabled');
      openspace.setPropertyValueSingle('Dashboard.IsEnabled', !isEnabled[1]);
      openspace.setPropertyValueSingle("RenderEngine.ShowLog", !isEnabled[1]);
      openspace.setPropertyValueSingle("RenderEngine.ShowVersion", !isEnabled[1]);
      openspace.setPropertyValueSingle("RenderEngine.ShowCamera", !isEnabled[1]);
    },
    'Toggle Native GUI': async () => { 
      var isEnabled = await openspace.getPropertyValue('Modules.ImGUI.Main.Enabled');
      openspace.setPropertyValueSingle('Modules.ImGUI.Main.Enabled', !isEnabled[1]);
    },
    'Toggle Main GUI': async () => { 
      var isEnabled = await openspace.getPropertyValue('Modules.CefWebGui.Visible');
      openspace.setPropertyValueSingle('Modules.CefWebGui.Visible', !isEnabled[1]);
    },
    'Take Screenshot': () => { 
      openspace.setPropertyValueSingle('RenderEngine.TakeScreenshot', null)
    },
    '---': () => { 
    },
    '!!!---> Toggle Shutdown <---!!!': () => { 
      openspace.toggleShutdown();
    },
  }
};


//helper function for nicely fading groups of trails
var showTrails = (objects) => {
  objects.map(async (object) => {
    let isEnabled = false;
    const returnValue = await openspace.getPropertyValue("Scene." + object + "Trail.Renderable.Enabled");
    if (returnValue) {
      isEnabled = returnValue[1];
    }
    if (!isEnabled) {      
      openspace.setPropertyValue("Scene." + object + "Trail.Renderable.Opacity", 0)
      openspace.setPropertyValue("Scene." + object + "Trail.Renderable.Enabled", true)
    }
    openspace.setPropertyValue("Scene." + object + "Trail.Renderable.Opacity", 1, 1)
  })
}

var trailButtons = {
  title: "Show Trails",
  buttons: {
    'Moon': () => { showTrails(['Moon']) },
    'Earth, Moon & Mars': () => { showTrails(['Earth', 'Moon', 'Mars']) },
	    'turn off ISS trail': () => { 
      openspace.setPropertyValueSingle("Scene.ISS_trail.Renderable.Enabled", false)
    },
    'focus on moon': () => { 
      openspace.setPropertyValueSingle("NavigationHandler.OrbitalNavigator.RetargetAnchor", null)
      openspace.setPropertyValueSingle("NavigationHandler.OrbitalNavigator.Anchor", 'Moon')
      openspace.setPropertyValueSingle("NavigationHandler.OrbitalNavigator.Aim", '')
    },
	'turn on boundries': () => { 
      openspace.setPropertyValueSingle("Scene.ConstellationBounds.Renderable.Enabled", true)
    },
  }
};

//helper function for nicely fading groups of trails
var hideTrails = (objects) => {
  objects.map(async (object) => {
    openspace.setPropertyValue("Scene." + object + "Trail.Renderable.Opacity", 0, 1)
  })
}

var hideTrailButtons = {
  title: "Hide Trails",
  buttons: {
    'Moon': () => { hideTrails(['Moon']) },
    'Earth, Moon & Mars': () => { hideTrails(['Earth', 'Moon', 'Mars']) },
  }
};



var defaultButtonGroups = [TimeButtons, myButtons, VisualButtons, FrictionButtons, SystemButtons, trailButtons, hideTrailButtons];

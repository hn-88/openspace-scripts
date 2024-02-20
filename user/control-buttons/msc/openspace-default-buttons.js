

var myButtons = {
  title: "Lunar Journey",
  buttons: {
	'Setup': () => {
	  openspace.sessionRecording.startPlayback("Lunar Journey.osrec",false);
	  openspace.setPropertyValueSingle("ScreenSpace.waxing-crescent-moon.Fade",0,1);
	  openspace.setPropertyValueSingle("ScreenSpace.waxing-gibbous-moon.Fade",0,1);
	  openspace.setPropertyValueSingle("ScreenSpace.Phases-of-the-Moon.Fade",0,1);
	  openspace.setPropertyValueSingle("ScreenSpace.Phases-of-the-Moon.Scale",1,1)
	  openspace.setPropertyValueSingle("ScreenSpace.Lunar-Eclipse.Fade",0,1);
	  openspace.setPropertyValueSingle("ScreenSpace.Solar-Eclipse.Fade",0,1);
	  openspace.setPropertyValueSingle("Scene.CardinalDirectionSphere.Renderable.Fade",1,1);
	  openspace.setPropertyValueSingle("ScreenSpace.Happy_Birthday.Fade",0,1);	  
	  
	}, 
	'Set Sun': () => {
	  openspace.time.interpolateTime("2023-06-05T6:30:00.000",30)
	},
	'Crescent': () => {
	  openspace.setPropertyValueSingle("ScreenSpace.waxing-crescent-moon.Fade",1,1);
	},
	'Gibbous': () => {
	  openspace.setPropertyValueSingle("ScreenSpace.waxing-gibbous-moon.Fade",1,1);
	},
	'Phases': () => {
	  openspace.setPropertyValueSingle("ScreenSpace.Phases-of-the-Moon.Fade",1,1);
	},
	'Lunar Eclipse': () => {
	  openspace.setPropertyValueSingle("ScreenSpace.waxing-crescent-moon.Fade",0,1);
	  openspace.setPropertyValueSingle("ScreenSpace.waxing-gibbous-moon.Fade",0,1);
	  openspace.setPropertyValueSingle("ScreenSpace.Phases-of-the-Moon.Fade",0,1);
	  openspace.setPropertyValueSingle("ScreenSpace.Lunar-Eclipse.Fade",1,1);
	},
	'Solar Eclipse': () => {
	  openspace.setPropertyValueSingle("ScreenSpace.Solar-Eclipse.Fade",1,1);
	  openspace.setPropertyValueSingle("ScreenSpace.Lunar-Eclipse.Fade",0,1);
	  openspace.setPropertyValueSingle("Scene.Moon.Scale.Scale",1,1);
	},
	'Fade Slides': () => {
	  openspace.setPropertyValueSingle("ScreenSpace.Lunar-Eclipse.Fade",0,1);
	  openspace.setPropertyValueSingle("ScreenSpace.Solar-Eclipse.Fade",0,1);
	  openspace.sessionRecording.startPlayback("Eclipses.osrec",false);
	  openspace.setPropertyValueSingle("Scene.CardinalDirectionSphere.Renderable.Fade",0,1); 
	},
	'Eclipse Sequence': () => {
	  openspace.setPropertyValueSingle("ScreenSpace.Solar-Eclipse.Fade",0,1);
	  openspace.time.interpolateTime("2024-04-08T21:30:00.000",120)
	},
	'Moon': () => {
	  openspace.pathnavigation.flyTo("Moon")
	  openspace.setPropertyValueSingle("Scene.Apollo17Insignia.Renderable.Opacity", 1)
	  openspace.setPropertyValueSingle("Scene.Apollo11Insignia.Renderable.Opacity", 1)
	  openspace.setPropertyValueSingle("Scene.Apollo12Insignia.Renderable.Opacity", 1)
	  openspace.setPropertyValueSingle("Scene.Apollo14Insignia.Renderable.Opacity", 1)
	  openspace.setPropertyValueSingle("Scene.Apollo15Insignia.Renderable.Opacity", 1) 
	  openspace.setPropertyValueSingle("Scene.Apollo16Insignia.Renderable.Opacity", 1)
	},
	'Phobos': () => {
	  openspace.pathnavigation.flyTo("Phobos")
	  openspace.setPropertyValueSingle("Scene.Apollo17Insignia.Renderable.Opacity", 0,1)
	  openspace.setPropertyValueSingle("Scene.Apollo11Insignia.Renderable.Opacity", 0,1)
	  openspace.setPropertyValueSingle("Scene.Apollo12Insignia.Renderable.Opacity", 0,1)
	  openspace.setPropertyValueSingle("Scene.Apollo14Insignia.Renderable.Opacity", 0,1)
	  openspace.setPropertyValueSingle("Scene.Apollo15Insignia.Renderable.Opacity", 0,1) 
	  openspace.setPropertyValueSingle("Scene.Apollo16Insignia.Renderable.Opacity", 0,1)
	},
	'...Io...': () => {
	  openspace.pathnavigation.flyTo("Io")
	},
	'Europa': () => {
	  openspace.pathnavigation.flyTo("Europa")
	},
	'Titan': () => {
	  openspace.pathnavigation.flyTo("Titan")
	},
	'Fly Home':() => {
	  openspace.pathnavigation.flyTo("Moon")
	},
  }
}


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
	'Happy Birthday!': () => {
	  openspace.setPropertyValueSingle("ScreenSpace.Happy_Birthday.Fade",1,1);
	  openspace.setPropertyValueSingle("ScreenSpace.Happy_Birthday.Scale",1,3)
	},
  }
};






var defaultButtonGroups = [myButtons, FrictionButtons, SystemButtons];

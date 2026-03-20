The exponent and size for Tully Galaxies Images were tweaked manually and inserted as script lines.

Since exporting on Linux crashed (due to too less RAM?) exported on Mac.

On Mac, alpha channel of the galaxy image has some issues, so rendered twice with and without Tully
and will compose video with Blender using some sort of Mask etc.

OR - 

With mw-tully2, Enable Max Size Control setting in this line

script 0 0 1 openspace.setPropertyValueSingle("Scene.TullyGalaxiesImages.Renderable.Sizing.EnableMaxSizeControl", true)

allows the fade-in to happen without obscuring the Milky Way with the galaxy in front of the camera.

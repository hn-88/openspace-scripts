Created for OpenSpace 0.19.2, works with 0.20.RC1

Modified from https://github.com/hn-88/openspace-scripts/tree/main/OpenSpace-ConstellationsTonight_draft

Workflow
--------

1. Create a recording in osrectxt format.
2. Open the recording using the file open button of this html page.
3. Create new keyframes (only camera movements are supported at present) without changing the object in focus.
4. Save the interpolated osrectxt file in user/recordings directory 
5. Refresh OpenSpace UI by hitting F5 to play the newly created osrectxt file. 
Created for OpenSpace 0.21

Modified from https://github.com/hn-88/openspace-scripts/tree/main/OpenSpace-ConstellationsTonight_draft

Workflow
--------

1. Save an initial camera keyframe
2. Save more camera keyframes, set the desired simulation time (in seconds) between them
(If the simulation time / realtime ratio varies between keyframe captures, appropriate openspace.time.setDeltaTime() calls are added automatically.)
3. Save the interpolated osrectxt file in user/recordings directory 
4. Refresh OpenSpace UI by hitting F5 to play the newly created osrectxt file. 

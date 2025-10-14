Created for OpenSpace 0.21

Modified from https://github.com/hn-88/openspace-scripts/tree/main/OpenSpace-ConstellationsTonight_draft

Workflow
--------

1. Save an initial camera Navstate and camera keyframe
2. Save more camera Navstates, set the desired simulation time (in seconds) between them 
(these are added to the sequence as flyToNavigationState calls with the appropriate time delay)
3. Save the sequence file in user/recordings directory - this is in the osrectxt format.
4. Refresh OpenSpace UI by hitting F5 to play the newly created osrectxt file. 

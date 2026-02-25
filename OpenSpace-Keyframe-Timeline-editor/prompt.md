This timeline editor was created by Claude.ai in a single prompt. The prompt was,

_We have these helper functions to manipulate openspace keyframe recordings as below. (Here, I copy-pasted the relevant fuunctions). Please create a timeline editor in html and javascript which allows us to edit openspace keyframe recordings. When portions of the timeline are deleted, the remaining keyframes' simulationtime and timestamps must be adjusted accordingly to ensure continuity. Also, the position and rotation of the camera must be interpolated to the new values after the cut, with an adjustable time period of interpolation, defaulting to one second._

The changes needed after this, in order to make the editor functional, can be seen in the [commit history](https://github.com/hn-88/openspace-scripts/commits/main/OpenSpace-Keyframe-Timeline-editor/openspace-timeline-editor.html).

//Doing it this way provides a much easier method of writing presenter messages/prompts
//The order doesn't matter, the function findMedssages in HTML file the  will find the right message to display for each button pressed
//remember to use single quotes inside the message; double quotes will break the system.
//For a new line, use <br>
var buttonMessages = [
	{
		buttonName: "Setup",
		message: "Everything's shiny, Cap'n!",
	},
	//Taken mostly from https://science.nasa.gov/solar-system/
	{
		buttonName: "Mercury Zoom_",
		message: "Mercury is the first planet from the Sun.  It's also the fastest planet as well as the smallest (besides dwarf planets).  As of writing it is being explored by the BepiColumbo mission.",
	},
	{
		buttonName: "Venus Zoom_",
		message: "Venus is the second farthest planet from the Sun.  It's also the hottest planet, even hotter than Mercury, the closest planet to the Sun, due to its intense greenhouse effect.  NASA is working on two robotic mission: DAVINCI and VERITAS.",
	},
	{
		buttonName: "Mars Zoom_",
		message: "Fourth planet from the Sun, Mars is about half the diameter of the Earth.  As of writing, it is the only other planet where we have active surface explorers like rovers and landers.",
	},
	{
		buttonName: "Jupiter Zoom_",
		message: "Fifth planet from the Sun, past the asteroid belt.  Jupiter is the 'King of the planets' as the largest by far.  You could easily fit all the other planets inside.  Currently being explored by the JUNO mission and will soon by joined by the Europa Clipper mission to study its icy moon.",
	},

	{
		buttonName: "Saturn Zoom_",
		message: "Sixth planet from the Sun, while Saturn is famous for its beautiful rings, remember that ALL the gas giants have rings to some degree. Last explored up close by the Cassini spacecraft.",
	},

	{
		buttonName: "Uranus Zoom_",
		message: "Seventh planet from the Sun, Uranus's moons are primarily named after Shakespeare characters such as Juliet, Oberon, Miranda, and more.  Last explored up close by the Voyager 2 spacecraft.",
	},

	{
		buttonName: "Neptune Zoom_",
		message: "Neptune is the eighth, and most distant planet from the Sun. It’s the fourth-largest, and the first planet discovered with math.",
	},

	{
		buttonName: "Pluto Zoom_",
		message: "Pluto is by far the most famous dwarf planet. Discovered by Clyde Tombaugh in 1930, Pluto was long considered our solar system's ninth planet. But after other astronomers found similar intriguing worlds deeper in the distant Kuiper Belt – the IAU reclassified Pluto as a dwarf planet in 2006.",
	},
	//taken from nasa.gov
	{
		buttonName: "Exoplanet Watch",
		message: "A citizen science project, sponsored by NASA's Universe of Learning, we help anyone (yes, you!) gather data about exoplanets, planets outside our solar system. Then analyze that data, submit your results into a NASA database, AND get credit for your work in scientific papers!  No telescope? No problem! Use our remote robotic telescopes.",
	},
	{
		buttonName: "Hercules Globular Cluster",
		message: "Like shiny flakes sparkling in a snow globe, over 100,000 stars whirl within the globular cluster M13, one of the brightest star clusters visible from the Northern Hemisphere. Located 25,000 light-years from Earth with an apparent magnitude of 5.8, this glittering metropolis of stars in the constellation Hercules can be spotted with a pair of binoculars most easily in July. <br><br>The English astronomer Edmond Halley, best known for recognizing the periodicity of the comet that bears his name, discovered M13 in 1714. When Charles Messier added M13 to his catalog in 1764, he was convinced that the nebulous object did not contain any stars at all. Because they are so densely packed together, the cluster’s individual stars were not resolved until 1779. Near the core of this cluster, the density of the stellar population is about a hundred times greater than the density in the neighborhood of our sun. These stars are so crowded that they can, at times, run into each other and even form a new star. The resulting “blue stragglers” appear to be younger than the other stars in their immediate vicinity and are of great scientific interest to astronomers. <br><br>Hubble’s composite image of this cluster’s core was created using observations taken between 1999 and 2006 in both visible and infrared wavelengths.",
	},
	{
		buttonName: "Kepler-62 f",
		message: "Kepler-62 f is a super Earth exoplanet that orbits a K-type star. Its mass is 35 Earths, it takes 267.3 days to complete one orbit of its star, and is 0.718 AU from its star. Its discovery was announced in 2013.",
	},
	{
		buttonName: "Pleiades",
		message: "Also known in Japan as 'Subaru,' Commonly called the Pleiades or Seven Sisters, M45 is known as an open star cluster. It contains over a thousand stars that are loosely bound by gravity, but it is visually dominated by a handful of its brightest members.<br><br>One of these stars, Merope, is located just outside the frame of this image to the upper right. The colorful rays of light at the upper right, emanating from the star, are an optical phenomenon produced within the telescope. The nearly straight, blue-white wisps pointing toward the upper right are streams of large dust particles. As the cloud moves toward Merope, its smaller dust particles are slowed down by the star’s radiation pressure more than the larger particles are. The large dust particles continue on toward the star while the smaller particles are left behind at the lower left of the picture.<br><br>The Pleiades cluster has been observed since ancient times, so it has no known discoverer. However, Galileo Galilei, the Italian scientist best known for discovering the largest moons of Jupiter and championing a heliocentric model of the solar system, was the first to observe the Pleiades through a telescope. M45 is located an average distance of 445 light-years from Earth in the constellation Taurus. It has an apparent magnitude of 1.6 and can be seen with the naked eye. The cluster is best observed during January.",
	},
	{
		buttonName: "Ring Nebula",
		message: "NASA’s James Webb Space Telescope has observed the well-known Ring Nebula in unprecedented detail. Formed by a star throwing off its outer layers as it runs out of fuel, the Ring Nebula is an archetypal planetary nebula. Also known as M57 and NGC 6720, it is relatively close to Earth at roughly 2,500 light-years away.<br><br>This new image from Webb’s NIRCam (Near-Infrared Camera) provides unprecedented spatial resolution and spectral sensitivity. For example, the intricate details of the filament structure of the inner ring are particularly visible in this dataset.<br><br>There are some 20,000 dense globules in the nebula, which are rich in molecular hydrogen. In contrast, the inner region shows very hot gas. The main shell contains a thin ring of enhanced emission from carbon-based molecules known as polycyclic aromatic hydrocarbons (PAHs). Roughly ten concentric arcs are located just beyond the outer edge of the main ring. The arcs are thought to originate from the interaction of the central star with a low-mass companion orbiting at a distance comparable to that between the Earth and Pluto. In this way, nebulae like the Ring Nebula reveal a kind of astronomical archaeology, as astronomers study the nebula to learn about the star that created it.",
	},
	{
		buttonName: "Sagittarius A*",
		message: "As the Event Horizon Telescope collected data for its remarkable new image of the Milky Way's supermassive black hole, a legion of other telescopes including three NASA X-ray observatories in space was also watching.<br><br>Astronomers are using these observations to learn more about how the black hole in the center of the Milky Way galaxy — known as Sagittarius A * (Sgr A* for short) — interacts with, and feeds off, its environment some 27,000 light years from Earth.",
	},
	{
		buttonName: "T Corona Borealis Nova",
		message: "A star system, located 3,000 light-years away from Earth, is predicted to become visible to the unaided eye soon. This could be a once-in-a-lifetime viewing opportunity as the nova ouburst only occurs about every 80 years. T Coronae Borealis, or T CrB, last exploded in 1946 and astronomers believe it will do so again between February and September 2024.",
	},
	{
		buttonName: "Whirlpool Galaxy",
		message: "The graceful, winding arms of the majestic spiral galaxy M51 appear like a grand spiral staircase sweeping through space. They are actually long lanes of stars and gas laced with dust. Such striking arms are a hallmark of so-called grand-design spiral galaxies. In M51, also known as the Whirlpool galaxy, these arms serve an important purpose: they are star-formation factories, compressing hydrogen gas and creating clusters of new stars.<br><br>Some astronomers think that the Whirlpool’s arms are particularly prominent because of the effects of a close encounter with NGC 5195, the small, yellowish galaxy at the outermost tip of one of the arms. The compact galaxy appears to be tugging on the arm, the tidal forces from which trigger new star formation. Hubble’s clear view shows that NGC 5195 is passing behind M51. The small galaxy has been gliding past the Whirlpool for hundreds of millions of years.<br><br>In Hubble’s captivating image of M51, the red represents infrared light as well as hydrogen within giant star-forming regions. The blue color can be attributed to hot, young stars while the yellow color is from older stars.<br><b>Discovered by Charles Messier in 1773, M51 is located 31 million light-years from Earth in the constellation Canes Venatici. It has an apparent magnitude of 8.4 and can be spotted with a small telescope most easily during May. The Whirlpool galaxy’s beautiful face-on view and closeness to Earth allow astronomers to study a classic spiral galaxy’s structure and star-forming processes.",
	},
	{
		buttonName: "Above Atmosphere",
		message: "Here we're flying just a little bit higher to help mitigate any label/clipping issues for the constellations",
	},

	//feel free to write prompts for every button as desired.
	{
		buttonName: "",
		message: "",
	},
];
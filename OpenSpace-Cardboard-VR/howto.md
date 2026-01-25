# A mini-howto on streaming OpenSpace to a VR headset - Google cardboard with Android phone
#### Incorporating suggestions of Gemini 3 on [aistudio.google.com](https://aistudio.google.com) (free plan)

## 1. VR360 stream setup on PC / Mac

1. Set up OpenSpace to output to an Equirectangular window configuration - in my case, I edited the built-in [equirectangular_gui.json](https://github.com/OpenSpace/OpenSpace/blob/master/config/equirectangular_gui.json) to change the output size from 1280x720 to 1440x720 since many VR players as well as YouTube need a 2:1 aspect ratio to recognize the stream as a VR360 video.

2. Set up the streaming video server - I used node-media-server since the setup was so easy -

   **iVRy is not available for macOS** as a host computer.

The reason is that Valve (the makers of Steam) **completely discontinued SteamVR support for macOS** in 2020. Since iVRy relies entirely on SteamVR drivers to work, it cannot run on a Mac.

### **So, what is your best option on Mac?**
Since iVRy is out, you must stick to the **"RTMP Stream"** method. This is the only reliable way to get video from a Mac to an Android Cardboard setup over LAN.

Here is the **easiest, confirmed working path** for your Mac setup:

#### **Step 1: Get the Server Running (Mac)**
Since you are on a Mac, avoid complex installs. Use **Node Media Server** (it takes 2 minutes).

1.  Open **Terminal**.
2.  Paste these commands one by one:
    ```bash
    # install npm for node if not already installed, with
    # brew install npm on Mac or
    # sudo apt install npm on Ubuntu
    mkdir rtmp-server
    cd rtmp-server
    npm install node-media-server
    ```
3.  Create a file named `app.js` in that folder with this content:
    ```javascript
    const NodeMediaServer = require('node-media-server');
    const config = {
      rtmp: { port: 1935, chunk_size: 60000, gop_cache: true, ping: 30, ping_timeout: 60 },
      http: { port: 8000, allow_origin: '*' }
    };
    var nms = new NodeMediaServer(config)
    nms.run();
    ```
4.  Run it: `node app.js`

#### **Step 2: Stream from OBS (Mac)**

1.  **Open OBS Studio.**
2.  **Add a Source:**
    *   In the "Sources" box, click the **+** icon and select **Game Capture** (preferred for performance) or **Window Capture**.
    *   Select the specific "OpenSpace" window.
    *   Ensure the preview in OBS fills the canvas.
3.  **Set Canvas Resolution:**
    *   Go to **Settings > Video**.
    *   Set the **Base (Canvas) Resolution** to match your OpenSpace window (e.g., 1920x960, 3840x1920, or 4096x2048 for higher quality).
    *   Set the **Output (Scaled) Resolution** to the same value.
    *   *Note: Higher resolutions (4K) look better in VR but require a strong network and GPU.*

---

### **Step 3: Set Up the Local LAN Stream**
For local VR streaming, **SRT (Secure Reliable Transport)** or **RTMP** are the standard protocols. SRT often has lower latency.

#### **Option A: Using SRT (Recommended for lower latency - this is what we tested initially with VLC)**
1.  **OBS Settings > Stream:**
    *   **Service:** Custom...
    *   **Server:** `srt://[YOUR_PC_IP_ADDRESS]:10000?mode=listener&latency=20000`
        *   Replace `[YOUR_PC_IP_ADDRESS]` with your computer's local IP (e.g., `192.168.1.15`). You can find this by running `ipconfig` in the Windows Command Prompt.
    *   **Key:** (Leave blank).
2.  **Output Settings:**
    *   Go to **Output** and ensure "Output Mode" is set to **Advanced**.
    *   **Encoder:** NVIDIA NVENC H.264 (or any other hardware accelerated codec if available) or x264.
    *   **Bitrate:** For 4K 360 video, aim high (e.g., **20,000–40,000 Kbps**) if your router can handle it.
    *   **Keyframe Interval:** Set to **2s** (crucial for streaming stability).
3.  **Start Streaming:** Click "Start Streaming" in OBS. OBS is now "listening" for a connection.

#### **Option B: Using RTMP (Requires a local server - this is what we used for the actual VR video)**
If your VR player doesn't support SRT listener mode easily, you can use the "MonaServer" or "MistServer" (free simple executables) to act as a middleman.
1.  Run the local RTMP server.
2.  In OBS, stream to `rtmp://127.0.0.1/live` with a stream key like `openspace`.
3.  Your VR headset will connect to `rtmp://[YOUR_PC_IP]/live/openspace`.

In OBS Settings, in the Output settings, use the following settings - 

*   **Service:** Custom
*   **Server:** `rtmp://127.0.0.1/live`
*   **Key:** `openspace`

#### **Step 3: View on Android (Cardboard)**
1.  Connect your phone to the same WiFi as the Mac.
2.  Download **VRTV VR Video Player** (Free) from the Play Store.
3.  Open the stream: `rtmp://[YOUR_MAC_IP_ADDRESS]/live/openspace`
    *   *Find your Mac IP by holding the `Option` key and clicking the WiFi icon in your top menu bar.*
4.  In VRTV settings, select **Sphere (360)** and enable **Cardboard** mode.

## 2. VR360 player setup on the phone used in Google cardboard

For streaming OpenSpace to Android with Google Cardboard (split-screen view), the challenge is finding a player that supports **both** LAN streaming protocols (like SRT/RTMP) **and** Cardboard projection.

Most Android players cannot handle raw SRT streams well. So, we're using the **RTMP** plugin for the best compatibility with Android apps.

Here are the best solutions for Android Cardboard:

### **Method 1: VRTV Video Player (Best for Cardboard)**
This is an older but reliable app specifically designed for Cardboard and network streams.

1.  **Prepare the Stream (RTMP recommended):**
    *   Run **MonaServer** on your PC.
    *   In OBS, stream to `rtmp://127.0.0.1/live` with key `openspace`.
    *   Ensure your firewall allows port 1935.
2.  **Install App:** Download **VRTV VR Video Player** (Free or Paid) from the Play Store.
3.  **Open the Stream:**
    *   Open the app.
    *   Tap the **Menu** (three lines) > **Network Stream**.
    *   Type: `rtmp://192.168.x.x/live/openspace` (Replace `192.168.x.x` with your PC's IP).
4.  **Configure View:**
    *   Once the video loads, tap the screen to see controls.
    *   Tap the **Screen Type** icon (rectangle). Select **360** (Spherical).
    *   Tap the **Cardboard / Glasses** icon.
    *   This will split the screen into left/right eyes and apply the lens distortion correction.

In my case, [VRTV VR Video Player Lite](https://play.google.com/store/apps/details?id=se.chai.vrtv.free) was available, for which the view configuration was as follows - 

Once we type in the rtmp stream URL, the options shown and the choices made were,

    * Screen - for which I chose the Pano 360 option
    
    * Video Type --> 2D
    
    * Projection --> Normal

### Responsivity and lag

With these settings, and choosing the cardboard viewer icon, the stream was being displayed in a SBS (Side-by-Side) form suitable for viewing with [Google Cardboard](https://arvr.google.com/cardboard/). Since the input was the full scene in VR360 Equirectangular projection, head-tracking was being handled by the phone, with no noticeable lag - the phone in this case was a [Samsung Galaxy M34 5G](https://www.gsmarena.com/samsung_galaxy_m34_5g-11290.php). But since the visuals were being streamed via OBS, a lag of around 3 seconds is noted between control inputs on the Mac running OpenSpace and the phone with the display. 

---

### **Method 2: iVRy Driver (The "Virtual Monitor" Method)**
If you want the highest quality and low latency, you can turn your phone into a SteamVR headset. This skips the "video player" entirely and treats your phone as a VR display for your PC. (**not yet tested**)

1.  **Install iVRy** on your Android phone (Play Store) and PC (Steam).
2.  **Launch iVRy** on both. They will connect via LAN (or USB for better speed).
3.  SteamVR will launch on your PC.
4.  **In OBS:** Right-click the Preview window > **Fullscreen Projector (Preview)** > Select the HMD (Head Mounted Display) or the iVRy window.
5.  **On Phone:** You will see your OBS preview in VR/Cardboard mode immediately.
6.  Unfortunately, on testing this method using iVRy for google cardboard, **Fullscreen Projector (Preview)** did not show the HMD as an option for iVRy. On the google cardboard screen, OBS (and actually the entire desktop) was being shown as a **flat desktop window**, with iVRy's default background as the VR360 background. There did not seem to be a way to make the OpenSpace window from the desktop into a VR360 SBS view. Perhaps other HMDs may have this option enabled in OBS, so that the virtual monitor method can possibly be used - maybe with VR headsets like the Meta Quest which would attach directly to the PC / Mac.

> [!NOTE]  
> Virtual Desktop Classic is a paid app available on Steam, which can be used to mirror the desktop onto VR headsets, with customizable angle of display, even up to 360 degrees. But Virtual Desktop Classic does not seem to work with iVRy - it seems to need a VR headset like Oculus Rift, HTC Vive, etc.

> [!NOTE]  
> Trinus is a free app available, which can mirror the desktop onto headsets, which does display SBS (Side-by-Side) on iVRy also, but does not seem to support any head-tracking, and instead just shows the same PC display duplicated SBS.  


### **Summary Recommendation**
*   **Best Experience:** Use **VRTV Player** with an RTMP stream (via MonaServer).
*   **Low Latency:** Use **iVRy** (connects phone as a VR headset).

        const apiKey = "AIzaSyA-3G-AfUZ4eryEXZI7mLqoJod-oXk1Ruc"; 

        const playlistId = "PLDoPjvoNmBAwy-rS6WKudwVeb_x63EzgS";
        
        const apiURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=888&key=${apiKey}`;
        
        async function fetchVideos() {
            try {
                const response = await fetch(apiURL);
        
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
        
                const data = await response.json();
        
                // Debugging: Log API response to console
                console.log("API Response:", data);
        
                const videosContainer = document.getElementById('container');
        
                if (data.items.length === 0) {
                    throw new Error("No videos found in the playlist.");
                }
        
                // Embed videos
                data.items.forEach(item => {
                    const videoId = item.snippet.resourceId.videoId;
        
                    const iframe = document.createElement('iframe');
                    iframe.src = `https://www.youtube.com/embed/${videoId}`;
                    iframe.width = "560";
                    iframe.height = "315";
                    iframe.frameBorder = "0";
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    iframe.allowFullscreen = true;
        
                    videosContainer.appendChild(iframe);
                });
            } catch (error) {
                console.error("Error fetching videos:", error);
        
                const errorMessage = document.createElement('p');
                errorMessage.textContent = `Unable to fetch playlist videos: ${error.message}`;
                document.getElementById('container').appendChild(errorMessage);
            }
        }
        
        fetchVideos();
import React, { useState } from 'react';
import { RecorderService } from '../services/recorder.service';
import { PlayerService } from '../services/player.service';

const recorder = new RecorderService(window);
const player = new PlayerService(window);

const App: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [basicCode, setBasicCode] = useState('');

  const handleStartRecording = async () => {

    setRecording(true);
    await recorder.startRecording();
  };

  const handleStopRecording = async () => {
    //@ts-ignore
    if (window.microphone) {
      //@ts-ignore
      window.stopMicrophone();
      console.log('Microphone stopped');
  }
    setRecording(false);
    const code = await recorder.stopRecording();
    setBasicCode(code);
    // Save to file
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'automation.bas';
    a.click();
  };

  const handlePlayback = async () => {
    try {
      await player.executeBasicCode(basicCode);
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  return (
    <div className="p-4 h-auto">
      <h1 className="text-2xl font-bold mb-4">General Bots Desktop</h1>
      
      <div className="space-x-4 mb-4 h-auto">
        <button
          id="startBtn"
          className={`px-4 py-2 rounded ${recording ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          onClick={recording ? handleStopRecording : handleStartRecording}
        >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        
        <button
          id="stopBtn"
          className="px-4 py-2 rounded bg-green-500 text-white"
          onClick={handlePlayback}
          disabled={!basicCode}
        >
          Play Recording
        </button>
      </div>

      <div className="mt-4 h-20">
        <h2 className="text-xl font-bold mb-2">Generated BASIC Code:</h2>
        <pre className="h-20 min-h-100 bg-gray-100 p-2 rounded border">{basicCode}</pre>
      </div>

      
      <div className="mb-4">
        
        <a href="https://github.com/General Bots">General Bots</a>
      </div>

    </div>
    
  );
};

export default App;

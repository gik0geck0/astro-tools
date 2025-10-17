import { useState } from 'preact/hooks';

interface NPFResult {
  exposureTime: number;
  formula: string;
}

export default function NPFCalculator() {
  const [focalLength, setFocalLength] = useState<number>(50);
  const [aperture, setAperture] = useState<number>(2.8);
  const [pixelSize, setPixelSize] = useState<number>(4.5);
  const [declination, setDeclination] = useState<number>(0);
  const [result, setResult] = useState<NPFResult | null>(null);

  const calculateNPF = () => {
    // NPF Rule: t = (35 * N + 30 * p) / f
    // Where:
    // t = exposure time in seconds
    // N = aperture (f-number)
    // p = pixel size in micrometers
    // f = focal length in mm
    
    // For declination adjustment: multiply by cos(declination)
    const declinationFactor = Math.cos(declination * Math.PI / 180);
    
    const baseTime = (35 * aperture + 30 * pixelSize) / focalLength;
    const adjustedTime = baseTime * declinationFactor;
    
    const formula = `t = (35 × ${aperture} + 30 × ${pixelSize}) / ${focalLength} × cos(${declination}°)`;
    
    setResult({
      exposureTime: Math.round(adjustedTime * 100) / 100,
      formula: formula
    });
  };

  return (
    <div class="calculator">
      <h2>NPF (Night Photography Factor) Calculator</h2>
      <p class="description">
        The NPF rule calculates the maximum exposure time to avoid star trails. 
        It's more accurate than the traditional 500 rule, especially for modern cameras with small pixels.
      </p>
      
      <div class="form-grid">
        <div class="input-group">
          <label for="focal-length">Focal Length (mm)</label>
          <input
            id="focal-length"
            type="number"
            value={focalLength}
            onInput={(e) => setFocalLength(Number((e.target as HTMLInputElement).value))}
            min="1"
            step="0.1"
          />
        </div>
        
        <div class="input-group">
          <label for="aperture">Aperture (f-number)</label>
          <input
            id="aperture"
            type="number"
            value={aperture}
            onInput={(e) => setAperture(Number((e.target as HTMLInputElement).value))}
            min="0.5"
            step="0.1"
          />
        </div>
        
        <div class="input-group">
          <label for="pixel-size">Pixel Size (μm)</label>
          <input
            id="pixel-size"
            type="number"
            value={pixelSize}
            onInput={(e) => setPixelSize(Number((e.target as HTMLInputElement).value))}
            min="1"
            step="0.1"
          />
        </div>
        
        <div class="input-group">
          <label for="declination">Declination (°)</label>
          <input
            id="declination"
            type="number"
            value={declination}
            onInput={(e) => setDeclination(Number((e.target as HTMLInputElement).value))}
            min="-90"
            max="90"
            step="1"
          />
          <small>0° = celestial equator, 90° = north pole</small>
        </div>
      </div>
      
      <button onClick={calculateNPF} class="calculate-btn">
        Calculate Maximum Exposure Time
      </button>
      
      {result && (
        <div class="result">
          <h3>Result</h3>
          <div class="result-value">
            <strong>{result.exposureTime} seconds</strong>
          </div>
          <div class="formula">
            <strong>Formula:</strong> {result.formula}
          </div>
          <div class="tips">
            <h4>Tips:</h4>
            <ul>
              <li>This is the maximum exposure time before stars start to trail</li>
              <li>For sharper stars, use 70-80% of this time</li>
              <li>Higher declination (closer to poles) allows longer exposures</li>
              <li>Consider using a star tracker for longer exposures</li>
            </ul>
          </div>
        </div>
      )}
      
      <div class="common-settings">
        <h4>Common Camera Pixel Sizes:</h4>
        <div class="camera-list">
          <button onClick={() => setPixelSize(4.5)} class="camera-btn">Canon EOS R5 (4.5μm)</button>
          <button onClick={() => setPixelSize(3.76)} class="camera-btn">Sony A7R IV (3.76μm)</button>
          <button onClick={() => setPixelSize(5.9)} class="camera-btn">Canon EOS R6 (5.9μm)</button>
          <button onClick={() => setPixelSize(4.6)} class="camera-btn">Nikon Z6 (4.6μm)</button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'preact/hooks';

interface PixelScaleResult {
  pixelScale: number;
  fieldOfView: { width: number; height: number };
  sampling: string;
  formula: string;
}

export default function PixelScaleCalculator() {
  const [focalLength, setFocalLength] = useState<number>(1000);
  const [pixelSize, setPixelSize] = useState<number>(4.5);
  const [sensorWidth, setSensorWidth] = useState<number>(36);
  const [sensorHeight, setSensorHeight] = useState<number>(24);
  const [result, setResult] = useState<PixelScaleResult | null>(null);

  const calculatePixelScale = () => {
    // Pixel Scale = (206.265 * pixel_size_μm) / focal_length_mm
    // Field of View = (sensor_size_mm * 57.2958) / focal_length_mm
    
    const pixelScale = (206.265 * pixelSize) / focalLength;
    const fovWidth = (sensorWidth * 57.2958) / focalLength;
    const fovHeight = (sensorHeight * 57.2958) / focalLength;
    
    // Determine sampling quality
    let sampling = '';
    if (pixelScale < 1) {
      sampling = 'Excellent (undersampled)';
    } else if (pixelScale < 2) {
      sampling = 'Good';
    } else if (pixelScale < 3) {
      sampling = 'Fair (oversampled)';
    } else {
      sampling = 'Poor (heavily oversampled)';
    }
    
    const formula = `Pixel Scale = (206.265 × ${pixelSize}) / ${focalLength} = ${pixelScale.toFixed(2)} arcsec/pixel`;
    
    setResult({
      pixelScale: Math.round(pixelScale * 100) / 100,
      fieldOfView: {
        width: Math.round(fovWidth * 100) / 100,
        height: Math.round(fovHeight * 100) / 100
      },
      sampling,
      formula
    });
  };

  return (
    <div class="calculator">
      <h2>Pixel Scale & Field of View Calculator</h2>
      <p class="description">
        Calculate pixel scale (arcseconds per pixel) and field of view for your telescope and camera setup.
        This helps determine if your setup is properly sampled for the seeing conditions.
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
            step="1"
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
          <label for="sensor-width">Sensor Width (mm)</label>
          <input
            id="sensor-width"
            type="number"
            value={sensorWidth}
            onInput={(e) => setSensorWidth(Number((e.target as HTMLInputElement).value))}
            min="1"
            step="0.1"
          />
        </div>
        
        <div class="input-group">
          <label for="sensor-height">Sensor Height (mm)</label>
          <input
            id="sensor-height"
            type="number"
            value={sensorHeight}
            onInput={(e) => setSensorHeight(Number((e.target as HTMLInputElement).value))}
            min="1"
            step="0.1"
          />
        </div>
      </div>
      
      <button onClick={calculatePixelScale} class="calculate-btn">
        Calculate Pixel Scale & FoV
      </button>
      
      {result && (
        <div class="result">
          <h3>Results</h3>
          
          <div class="result-grid">
            <div class="result-item">
              <div class="result-label">Pixel Scale</div>
              <div class="result-value">{result.pixelScale} arcsec/pixel</div>
            </div>
            
            <div class="result-item">
              <div class="result-label">Field of View</div>
              <div class="result-value">{result.fieldOfView.width}° × {result.fieldOfView.height}°</div>
            </div>
            
            <div class="result-item">
              <div class="result-label">Sampling Quality</div>
              <div class="result-value sampling-{result.sampling.toLowerCase().split(' ')[0]}">{result.sampling}</div>
            </div>
          </div>
          
          <div class="formula">
            <strong>Formula:</strong> {result.formula}
          </div>
          
          <div class="tips">
            <h4>Sampling Guidelines:</h4>
            <ul>
              <li><strong>Excellent (&lt; 1 arcsec/pixel):</strong> Undersampled - captures fine detail but may need longer exposures</li>
              <li><strong>Good (1-2 arcsec/pixel):</strong> Well-sampled for most seeing conditions</li>
              <li><strong>Fair (2-3 arcsec/pixel):</strong> Oversampled - good for poor seeing conditions</li>
              <li><strong>Poor (&gt; 3 arcsec/pixel):</strong> Heavily oversampled - consider shorter focal length or smaller pixels</li>
            </ul>
          </div>
        </div>
      )}
      
      <div class="common-settings">
        <h4>Common Camera Sensors:</h4>
        <div class="camera-list">
          <button onClick={() => { setSensorWidth(36); setSensorHeight(24); setPixelSize(4.5); }} class="camera-btn">
            Canon EOS R5 (36×24mm, 4.5μm)
          </button>
          <button onClick={() => { setSensorWidth(35.9); setSensorHeight(24); setPixelSize(3.76); }} class="camera-btn">
            Sony A7R IV (35.9×24mm, 3.76μm)
          </button>
          <button onClick={() => { setSensorWidth(36); setSensorHeight(24); setPixelSize(5.9); }} class="camera-btn">
            Canon EOS R6 (36×24mm, 5.9μm)
          </button>
          <button onClick={() => { setSensorWidth(35.9); setSensorHeight(23.9); setPixelSize(4.6); }} class="camera-btn">
            Nikon Z6 (35.9×23.9mm, 4.6μm)
          </button>
          <button onClick={() => { setSensorWidth(17.3); setSensorHeight(13); setPixelSize(3.45); }} class="camera-btn">
            ASI533MC (17.3×13mm, 3.45μm)
          </button>
        </div>
      </div>
      
      <div class="common-settings">
        <h4>Common Telescope Focal Lengths:</h4>
        <div class="camera-list">
          <button onClick={() => setFocalLength(400)} class="camera-btn">80mm f/5 (400mm)</button>
          <button onClick={() => setFocalLength(560)} class="camera-btn">80mm f/7 (560mm)</button>
          <button onClick={() => setFocalLength(1000)} class="camera-btn">100mm f/10 (1000mm)</button>
          <button onClick={() => setFocalLength(1200)} class="camera-btn">120mm f/10 (1200mm)</button>
          <button onClick={() => setFocalLength(2000)} class="camera-btn">200mm f/10 (2000mm)</button>
        </div>
      </div>
    </div>
  );
}

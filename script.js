// Manejo de eventos y cálculos principales
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculators();
});
function initializeCalculators() {
    // Inicializar calculadora de Ley de Ohm
    initOhmCalculator();
    
    // Inicializar calculadora de Ley de Pouillet
    initPouilletCalculator();
    
    // Inicializar calculadora de Código de Colores
    initColorCalculator();
}
// =================================
// CALCULADORA LEY DE OHM
// =================================
function initOhmCalculator() {
    // Event listeners para radio buttons
    const ohmRadios = document.querySelectorAll('input[name="ohm-calc"]');
    ohmRadios.forEach(radio => {
        radio.addEventListener('change', toggleOhmInputs);
    });
    // Event listeners para botones
    document.getElementById('calculate-ohm').addEventListener('click', calculateOhm);
    document.getElementById('clear-ohm').addEventListener('click', clearOhm);
    // Mostrar inputs iniciales
    toggleOhmInputs();
}
function toggleOhmInputs() {
    const selectedCalc = document.querySelector('input[name="ohm-calc"]:checked').value;
    
    // Ocultar todos los grupos de inputs
    document.getElementById('voltage-inputs').style.display = 'none';
    document.getElementById('current-inputs').style.display = 'none';
    document.getElementById('resistance-inputs').style.display = 'none';
    // Mostrar el grupo correspondiente
    switch(selectedCalc) {
        case 'voltage':
            document.getElementById('voltage-inputs').style.display = 'block';
            document.getElementById('ohm-formula').textContent = 'V = I × R';
            break;
        case 'current':
            document.getElementById('current-inputs').style.display = 'block';
            document.getElementById('ohm-formula').textContent = 'I = V / R';
            break;
        case 'resistance':
            document.getElementById('resistance-inputs').style.display = 'block';
            document.getElementById('ohm-formula').textContent = 'R = V / I';
            break;
    }
}
function calculateOhm() {
    const selectedCalc = document.querySelector('input[name="ohm-calc"]:checked').value;
    let result = 0;
    let resultText = '';
    try {
        switch(selectedCalc) {
            case 'voltage':
                result = calculateVoltage();
                resultText = formatResult(result, 'V');
                break;
            case 'current':
                result = calculateCurrent();
                resultText = formatResult(result, 'A');
                break;
            case 'resistance':
                result = calculateResistance();
                resultText = formatResult(result, 'Ω');
                break;
        }
        document.getElementById('ohm-result-value').textContent = resultText;
    } catch (error) {
        document.getElementById('ohm-result-value').textContent = 'Error: ' + error.message;
    }
}
function calculateVoltage() {
    const current = parseFloat(document.getElementById('current-v').value);
    const currentUnit = document.getElementById('current-v-unit').value;
    const resistance = parseFloat(document.getElementById('resistance-v').value);
    const resistanceUnit = document.getElementById('resistance-v-unit').value;
    if (isNaN(current) || isNaN(resistance) || current <= 0 || resistance <= 0) {
        throw new Error('Por favor, ingresa valores válidos mayores a cero');
    }
    // Convertir a unidades base
    const currentInA = convertCurrent(current, currentUnit);
    const resistanceInOhm = convertResistance(resistance, resistanceUnit);
    return currentInA * resistanceInOhm;
}
function calculateCurrent() {
    const voltage = parseFloat(document.getElementById('voltage-i').value);
    const voltageUnit = document.getElementById('voltage-i-unit').value;
    const resistance = parseFloat(document.getElementById('resistance-i').value);
    const resistanceUnit = document.getElementById('resistance-i-unit').value;
    if (isNaN(voltage) || isNaN(resistance) || voltage <= 0 || resistance <= 0) {
        throw new Error('Por favor, ingresa valores válidos mayores a cero');
    }
    const voltageInV = convertVoltage(voltage, voltageUnit);
    const resistanceInOhm = convertResistance(resistance, resistanceUnit);
    return voltageInV / resistanceInOhm;
}
function calculateResistance() {
    const voltage = parseFloat(document.getElementById('voltage-r').value);
    const voltageUnit = document.getElementById('voltage-r-unit').value;
    const current = parseFloat(document.getElementById('current-r').value);
    const currentUnit = document.getElementById('current-r-unit').value;
    if (isNaN(voltage) || isNaN(current) || voltage <= 0 || current <= 0) {
        throw new Error('Por favor, ingresa valores válidos mayores a cero');
    }
    const voltageInV = convertVoltage(voltage, voltageUnit);
    const currentInA = convertCurrent(current, currentUnit);
    return voltageInV / currentInA;
}
function clearOhm() {
    // Limpiar todos los inputs
    const inputs = document.querySelectorAll('#ohm-section input[type="number"]');
    inputs.forEach(input => input.value = '');
    
    // Resetear resultado
    document.getElementById('ohm-result-value').textContent = '--';
    document.getElementById('ohm-formula').textContent = 'Selecciona un cálculo';
}
// =================================
// CALCULADORA LEY DE POUILLET
// =================================
function initPouilletCalculator() {
    // Event listeners para radio buttons
    const pouilletRadios = document.querySelectorAll('input[name="pouillet-calc"]');
    pouilletRadios.forEach(radio => {
        radio.addEventListener('change', togglePouilletInputs);
    });
    // Event listeners para botones de materiales
    const materialButtons = document.querySelectorAll('.use-material');
    materialButtons.forEach(button => {
        button.addEventListener('click', useMaterial);
    });
    // Event listeners para cálculo de área
    document.getElementById('calc-area-r').addEventListener('click', calculateCircularArea);
    // Event listeners principales
    document.getElementById('calculate-pouillet').addEventListener('click', calculatePouillet);
    document.getElementById('clear-pouillet').addEventListener('click', clearPouillet);
    togglePouilletInputs();
}
function togglePouilletInputs() {
    const selectedCalc = document.querySelector('input[name="pouillet-calc"]:checked').value;
    
    // Ocultar todos los grupos
    document.getElementById('resistance-inputs-p').style.display = 'none';
    document.getElementById('resistivity-inputs-p').style.display = 'none';
    document.getElementById('length-inputs-p').style.display = 'none';
    document.getElementById('area-inputs-p').style.display = 'none';
    // Mostrar el grupo correspondiente
    switch(selectedCalc) {
        case 'resistance':
            document.getElementById('resistance-inputs-p').style.display = 'block';
            document.getElementById('pouillet-formula').textContent = 'R = ρ × L / A';
            break;
        case 'resistivity':
            document.getElementById('resistivity-inputs-p').style.display = 'block';
            document.getElementById('pouillet-formula').textContent = 'ρ = R × A / L';
            break;
        case 'length':
            document.getElementById('length-inputs-p').style.display = 'block';
            document.getElementById('pouillet-formula').textContent = 'L = R × A / ρ';
            break;
        case 'area':
            document.getElementById('area-inputs-p').style.display = 'block';
            document.getElementById('pouillet-formula').textContent = 'A = ρ × L / R';
            break;
    }
}
function useMaterial(event) {
    const resistivity = event.target.dataset.resistivity;
    console.log('Resistividad seleccionada:', resistivity); // Para debug
    
    // Obtener el tipo de cálculo seleccionado
    const selectedCalc = document.querySelector('input[name="pouillet-calc"]:checked').value;
    console.log('Cálculo seleccionado:', selectedCalc); // Para debug
    
    let resistivityInput = null;
    
    // Buscar el input de resistividad según el cálculo seleccionado
    switch(selectedCalc) {
        case 'resistance':
            resistivityInput = document.getElementById('resistivity-r');
            break;
        case 'resistivity':
            // No aplicable - estamos calculando la resistividad
            alert('No puedes usar un material predefinido cuando estás calculando la resistividad');
            return;
        case 'length':
            resistivityInput = document.getElementById('resistivity-l');
            break;
        case 'area':
            resistivityInput = document.getElementById('resistivity-a');
            break;
    }
    
    if (resistivityInput) {
        resistivityInput.value = resistivity;
        console.log('Valor asignado al input:', resistivityInput.id); // Para debug
    } else {
        console.error('No se encontró el input de resistividad para:', selectedCalc);
    }
}
function calculateCircularArea() {
    const diameter = parseFloat(document.getElementById('diameter-r').value);
    const unit = document.getElementById('diameter-r-unit').value;
    
    if (isNaN(diameter) || diameter <= 0) {
        alert('Por favor, ingresa un diámetro válido');
        return;
    }
    // Convertir a metros
    let diameterInM = diameter;
    switch(unit) {
        case 'mm':
            diameterInM = diameter / 1000;
            break;
        case 'cm':
            diameterInM = diameter / 100;
            break;
    }
    const radius = diameterInM / 2;
    const area = Math.PI * Math.pow(radius, 2);
    document.getElementById('area-r').value = area;
    document.getElementById('area-r-unit').value = 'm2';
}
function calculatePouillet() {
    const selectedCalc = document.querySelector('input[name="pouillet-calc"]:checked').value;
    let result = 0;
    let resultText = '';
    try {
        switch(selectedCalc) {
            case 'resistance':
                result = calculatePouilletResistance();
                resultText = formatResult(result, 'Ω');
                break;
            case 'resistivity':
                result = calculatePouilletResistivity();
                resultText = formatResult(result, 'Ω⋅m');
                break;
            case 'length':
                result = calculatePouilletLength();
                resultText = formatResult(result, 'm');
                break;
            case 'area':
                result = calculatePouilletArea();
                resultText = formatResult(result, 'm²');
                updateEquivalentDiameter(result);
                break;
        }
        document.getElementById('pouillet-result-value').textContent = resultText;
    } catch (error) {
        document.getElementById('pouillet-result-value').textContent = 'Error: ' + error.message;
    }
}
function calculatePouilletResistance() {
    const resistivity = parseFloat(document.getElementById('resistivity-r').value);
    const length = parseFloat(document.getElementById('length-r').value);
    const lengthUnit = document.getElementById('length-r-unit').value;
    const area = parseFloat(document.getElementById('area-r').value);
    const areaUnit = document.getElementById('area-r-unit').value;
    if (isNaN(resistivity) || isNaN(length) || isNaN(area) || 
        resistivity <= 0 || length <= 0 || area <= 0) {
        throw new Error('Por favor, ingresa valores válidos mayores a cero');
    }
    const lengthInM = convertLength(length, lengthUnit);
    const areaInM2 = convertArea(area, areaUnit);
    return resistivity * (lengthInM / areaInM2);
}
function calculatePouilletResistivity() {
    const resistance = parseFloat(document.getElementById('resistance-rho').value);
    const resistanceUnit = document.getElementById('resistance-rho-unit').value;
    const area = parseFloat(document.getElementById('area-rho').value);
    const areaUnit = document.getElementById('area-rho-unit').value;
    const length = parseFloat(document.getElementById('length-rho').value);
    const lengthUnit = document.getElementById('length-rho-unit').value;
    if (isNaN(resistance) || isNaN(area) || isNaN(length) || 
        resistance <= 0 || area <= 0 || length <= 0) {
        throw new Error('Por favor, ingresa valores válidos mayores a cero');
    }
    const resistanceInOhm = convertResistance(resistance, resistanceUnit);
    const areaInM2 = convertArea(area, areaUnit);
    const lengthInM = convertLength(length, lengthUnit);
    return (resistanceInOhm * areaInM2) / lengthInM;
}
function calculatePouilletLength() {
    const resistance = parseFloat(document.getElementById('resistance-l').value);
    const resistanceUnit = document.getElementById('resistance-l-unit').value;
    const area = parseFloat(document.getElementById('area-l').value);
    const areaUnit = document.getElementById('area-l-unit').value;
    const resistivity = parseFloat(document.getElementById('resistivity-l').value);
    if (isNaN(resistance) || isNaN(area) || isNaN(resistivity) || 
        resistance <= 0 || area <= 0 || resistivity <= 0) {
        throw new Error('Por favor, ingresa valores válidos mayores a cero');
    }
    const resistanceInOhm = convertResistance(resistance, resistanceUnit);
    const areaInM2 = convertArea(area, areaUnit);
    return (resistanceInOhm * areaInM2) / resistivity;
}
function calculatePouilletArea() {
    const resistivity = parseFloat(document.getElementById('resistivity-a').value);
    const length = parseFloat(document.getElementById('length-a').value);
    const lengthUnit = document.getElementById('length-a-unit').value;
    const resistance = parseFloat(document.getElementById('resistance-a').value);
    const resistanceUnit = document.getElementById('resistance-a-unit').value;
    if (isNaN(resistivity) || isNaN(length) || isNaN(resistance) || 
        resistivity <= 0 || length <= 0 || resistance <= 0) {
        throw new Error('Por favor, ingresa valores válidos mayores a cero');
    }
    const lengthInM = convertLength(length, lengthUnit);
    const resistanceInOhm = convertResistance(resistance, resistanceUnit);
    return (resistivity * lengthInM) / resistanceInOhm;
}
function updateEquivalentDiameter(areaInM2) {
    const radius = Math.sqrt(areaInM2 / Math.PI);
    const diameter = radius * 2;
    const diameterInMm = diameter * 1000;
    
    document.getElementById('equivalent-diameter').textContent = 
        `${diameterInMm.toFixed(4)} mm`;
}
function clearPouillet() {
    const inputs = document.querySelectorAll('#pouillet-section input[type="number"]');
    inputs.forEach(input => input.value = '');
    
    document.getElementById('pouillet-result-value').textContent = '--';
    document.getElementById('pouillet-formula').textContent = 'Selecciona un cálculo';
    document.getElementById('equivalent-diameter').textContent = '--';
}
// =================================
// CALCULADORA CÓDIGO DE COLORES
// =================================
function initColorCalculator() {
    // Event listeners para número de bandas
    const bandRadios = document.querySelectorAll('input[name="band-count"]');
    bandRadios.forEach(radio => {
        radio.addEventListener('change', toggleBandInputs);
    });
    // Event listeners para selectores de color
    const colorSelects = document.querySelectorAll('.color-selector select');
    colorSelects.forEach(select => {
        select.addEventListener('change', updateVisualResistor);
    });
    // Event listeners principales
    document.getElementById('calculate-color').addEventListener('click', calculateColorCode);
    document.getElementById('clear-color').addEventListener('click', clearColorCode);
    document.getElementById('calculate-reverse').addEventListener('click', calculateReverseColor);
    toggleBandInputs();
}
function toggleBandInputs() {
    const bandCount = document.querySelector('input[name="band-count"]:checked').value;
    
    // Ocultar todos los grupos
    document.getElementById('bands-4').style.display = 'none';
    document.getElementById('bands-5').style.display = 'none';
    document.getElementById('bands-6').style.display = 'none';
    // Ocultar bandas visuales
    for (let i = 1; i <= 6; i++) {
        const band = document.getElementById(`visual-band-${i}`);
        if (band) {
            band.style.display = i <= bandCount ? 'block' : 'none';
            band.className = 'band';
        }
    }
    // Mostrar grupo correspondiente
    document.getElementById(`bands-${bandCount}`).style.display = 'block';
    
    // CORRECCIÓN: Mostrar/ocultar coeficiente de temperatura tanto en resultados como en calculadora inversa
    const tempCoeffResult = document.getElementById('temp-coeff');
    const tempCoeffInput = document.getElementById('temp-coeff-input-group'); // Asegúrate de que este ID existe en tu HTML
    
    if (tempCoeffResult) {
        tempCoeffResult.style.display = bandCount === '6' ? 'block' : 'none';
    }
    
    if (tempCoeffInput) {
        tempCoeffInput.style.display = bandCount === '6' ? 'block' : 'none';
    }
    updateVisualResistor();
}
function updateVisualResistor() {
    const bandCount = document.querySelector('input[name="band-count"]:checked').value;
    
    for (let i = 1; i <= bandCount; i++) {
        const select = document.getElementById(`band${i}-${bandCount}`);
        const visualBand = document.getElementById(`visual-band-${i}`);
        
        if (select && visualBand && select.selectedOptions[0]) {
            const color = select.selectedOptions[0].dataset.color;
            visualBand.className = `band color-${color}`;
        }
    }
}
function calculateColorCode() {
    const bandCount = document.querySelector('input[name="band-count"]:checked').value;
    
    try {
        const result = calculateResistanceFromColors(bandCount);
        displayColorResult(result, bandCount);
    } catch (error) {
        document.getElementById('color-result-value').textContent = 'Error: ' + error.message;
    }
}
function calculateResistanceFromColors(bandCount) {
    const bands = [];
    
    // Obtener valores de las bandas
    for (let i = 1; i <= bandCount; i++) {
        const select = document.getElementById(`band${i}-${bandCount}`);
        if (!select.value) {
            throw new Error(`Por favor, selecciona el color de la banda ${i}`);
        }
        bands.push(select.value);
    }
    let resistance = 0;
    let tolerance = 0;
    let tempCoeff = null;
    switch (bandCount) {
        case '4':
            // Dígitos + Multiplicador + Tolerancia
            resistance = (parseInt(bands[0]) * 10 + parseInt(bands[1])) * parseFloat(bands[2]);
            tolerance = parseFloat(bands[3]);
            break;
            
        case '5':
            // 3 Dígitos + Multiplicador + Tolerancia
            resistance = (parseInt(bands[0]) * 100 + parseInt(bands[1]) * 10 + parseInt(bands[2])) * parseFloat(bands[3]);
            tolerance = parseFloat(bands[4]);
            break;
            
        case '6':
            // 3 Dígitos + Multiplicador + Tolerancia + Temp Coeff
            resistance = (parseInt(bands[0]) * 100 + parseInt(bands[1]) * 10 + parseInt(bands[2])) * parseFloat(bands[3]);
            tolerance = parseFloat(bands[4]);
            tempCoeff = parseFloat(bands[5]);
            break;
    }
    return {
        value: resistance,
        tolerance: tolerance,
        tempCoeff: tempCoeff
    };
}
function displayColorResult(result, bandCount) {
    const formattedValue = formatResistanceValue(result.value);
    
    document.getElementById('color-result-value').textContent = formattedValue;
    document.getElementById('resistance-value').textContent = formattedValue;
    document.getElementById('tolerance-value').textContent = `±${result.tolerance}%`;
    
    const minValue = result.value * (1 - result.tolerance / 100);
    const maxValue = result.value * (1 + result.tolerance / 100);
    document.getElementById('range-value').textContent = 
        `${formatResistanceValue(minValue)} - ${formatResistanceValue(maxValue)}`;
    // CORRECCIÓN: Manejo mejorado del coeficiente de temperatura
    const tempCoeffElement = document.getElementById('temp-coeff-value');
    const tempCoeffContainer = document.getElementById('temp-coeff');
    
    if (tempCoeffContainer) {
        if (bandCount === '6') {
            tempCoeffContainer.style.display = 'block';
            if (tempCoeffElement) {
                if (result.tempCoeff !== null && result.tempCoeff !== undefined) {
                    tempCoeffElement.textContent = `${result.tempCoeff} ppm/K`;
                } else {
                    tempCoeffElement.textContent = 'No especificado';
                }
            }
        } else {
            tempCoeffContainer.style.display = 'none';
        }
    }
}
function calculateReverseColor() {
    const resistance = parseFloat(document.getElementById('resistance-input').value);
    const unit = parseFloat(document.getElementById('resistance-unit').value);
    const tolerance = parseFloat(document.getElementById('tolerance-input').value);
    
    // Agregar input para coeficiente de temperatura si existe
    let tempCoeff = null;
    const tempCoeffInput = document.getElementById('temp-coeff-input');
    if (tempCoeffInput && tempCoeffInput.value) {
        tempCoeff = parseFloat(tempCoeffInput.value);
    }
    if (isNaN(resistance) || resistance <= 0) {
        alert('Por favor, ingresa una resistencia válida');
        return;
    }
    const resistanceInOhms = resistance * unit;
    const colors = getColorsFromResistance(resistanceInOhms, tolerance, tempCoeff);
    
    document.getElementById('suggested-colors').innerHTML = colors;
}
function getColorsFromResistance(resistance, tolerance, tempCoeff = null) {
    const colorNames = ['Negro', 'Marrón', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Violeta', 'Gris', 'Blanco'];
    const multipliers = [
        { value: 1, name: 'Negro' },
        { value: 10, name: 'Marrón' },
        { value: 100, name: 'Rojo' },
        { value: 1000, name: 'Naranja' },
        { value: 10000, name: 'Amarillo' },
        { value: 100000, name: 'Verde' },
        { value: 1000000, name: 'Azul' },
        { value: 10000000, name: 'Violeta' },
        { value: 0.1, name: 'Dorado' },
        { value: 0.01, name: 'Plateado' }
    ];
    
    // Función para encontrar la mejor representación
    function findBestRepresentation(value) {
        let bestResult = null;
        let minError = Infinity;
        
        // Probar con 4 bandas (2 dígitos significativos)
        for (let mult of multipliers) {
            let significantValue = value / mult.value;
            
            if (significantValue >= 10 && significantValue < 100) {
                let rounded = Math.round(significantValue);
                let actualValue = rounded * mult.value;
                let error = Math.abs(actualValue - value) / value * 100;
                
                if (error < minError) {
                    minError = error;
                    bestResult = {
                        type: '4-band',
                        digit1: Math.floor(rounded / 10),
                        digit2: rounded % 10,
                        multiplier: mult,
                        actualValue: actualValue,
                        error: error
                    };
                }
            }
        }
        
        // Probar con 5 bandas (3 dígitos significativos)
        for (let mult of multipliers) {
            let significantValue = value / mult.value;
            
            if (significantValue >= 100 && significantValue < 1000) {
                let rounded = Math.round(significantValue);
                let actualValue = rounded * mult.value;
                let error = Math.abs(actualValue - value) / value * 100;
                
                if (error < minError) {
                    minError = error;
                    bestResult = {
                        type: '5-band',
                        digit1: Math.floor(rounded / 100),
                        digit2: Math.floor((rounded % 100) / 10),
                        digit3: rounded % 10,
                        multiplier: mult,
                        actualValue: actualValue,
                        error: error
                    };
                }
            }
        }
        
        return bestResult;
    }
    
    const result = findBestRepresentation(resistance);
    
    if (!result) {
        return 'No se pudo determinar una combinación válida para este valor';
    }
    
    const toleranceColor = getToleranceColor(tolerance);
    const tempCoeffColor = getTempCoeffColor(tempCoeff);
    let colorSequence = '';
    let detailedInfo = '';
    
    if (result.type === '4-band') {
        const color1 = colorNames[result.digit1];
        const color2 = colorNames[result.digit2];
        const multColor = result.multiplier.name;
        
        colorSequence = `
            <div style="margin-bottom: 10px;">
                <strong>Configuración de 4 bandas:</strong><br>
                1ª banda: <span style="color: ${getColorHex(color1)}; font-weight: bold;">${color1}</span> (${result.digit1})<br>
                2ª banda: <span style="color: ${getColorHex(color2)}; font-weight: bold;">${color2}</span> (${result.digit2})<br>
                3ª banda: <span style="color: ${getColorHex(multColor)}; font-weight: bold;">${multColor}</span> (×${result.multiplier.value})<br>
                4ª banda: <span style="color: ${getColorHex(toleranceColor)}; font-weight: bold;">${toleranceColor}</span> (±${tolerance}%)
            </div>`;
    } else if (result.type === '5-band') {
        const color1 = colorNames[result.digit1];
        const color2 = colorNames[result.digit2];
        const color3 = colorNames[result.digit3];
        const multColor = result.multiplier.name;
        
        colorSequence = `
            <div style="margin-bottom: 10px;">
                <strong>Configuración de 5 bandas:</strong><br>
                1ª banda: <span style="color: ${getColorHex(color1)}; font-weight: bold;">${color1}</span> (${result.digit1})<br>
                2ª banda: <span style="color: ${getColorHex(color2)}; font-weight: bold;">${color2}</span> (${result.digit2})<br>
                3ª banda: <span style="color: ${getColorHex(color3)}; font-weight: bold;">${color3}</span> (${result.digit3})<br>
                4ª banda: <span style="color: ${getColorHex(multColor)}; font-weight: bold;">${multColor}</span> (×${result.multiplier.value})<br>
                5ª banda: <span style="color: ${getColorHex(toleranceColor)}; font-weight: bold;">${toleranceColor}</span> (±${tolerance}%)
            </div>`;
            
        // Agregar opción de 6 bandas si se proporciona coeficiente de temperatura
        if (tempCoeff !== null && tempCoeff !== undefined) {
            colorSequence += `
                <div style="margin-bottom: 10px;">
                    <strong>Configuración de 6 bandas (con coef. temperatura):</strong><br>
                    1ª banda: <span style="color: ${getColorHex(color1)}; font-weight: bold;">${color1}</span> (${result.digit1})<br>
                    2ª banda: <span style="color: ${getColorHex(color2)}; font-weight: bold;">${color2}</span> (${result.digit2})<br>
                    3ª banda: <span style="color: ${getColorHex(color3)}; font-weight: bold;">${color3}</span> (${result.digit3})<br>
                    4ª banda: <span style="color: ${getColorHex(multColor)}; font-weight: bold;">${multColor}</span> (×${result.multiplier.value})<br>
                    5ª banda: <span style="color: ${getColorHex(toleranceColor)}; font-weight: bold;">${toleranceColor}</span> (±${tolerance}%)<br>
                    6ª banda: <span style="color: ${getColorHex(tempCoeffColor)}; font-weight: bold;">${tempCoeffColor}</span> (${tempCoeff} ppm/K)
                </div>`;
        }
    }
    
    detailedInfo = `
        <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <strong>Información detallada:</strong><br>
            Valor solicitado: ${formatResistanceValue(resistance)}<br>
            Valor real: ${formatResistanceValue(result.actualValue)}<br>
            Error: ${result.error.toFixed(2)}%
            ${tempCoeff !== null && tempCoeff !== undefined ? `<br>Coef. temperatura: ${tempCoeff} ppm/K` : ''}
        </div>`;
    
    return colorSequence + detailedInfo;
}
function getTempCoeffColor(tempCoeff) {
    if (tempCoeff === null || tempCoeff === undefined) return 'Sin banda';
    
    const tempCoeffColors = {
        250: 'Negro',
        100: 'Marrón', 
        50: 'Rojo',
        15: 'Naranja',
        25: 'Amarillo', // Valor menos común
        20: 'Verde',    // Valor menos común
        10: 'Azul',
        5: 'Violeta',
        1: 'Gris'      // Valor menos común
    };
    
    return tempCoeffColors[tempCoeff] || 'Marrón'; // Valor por defecto
}
function getColorHex(colorName) {
    const colorMap = {
        'Negro': '#000000',
        'Marrón': '#8B4513',
        'Rojo': '#FF0000',
        'Naranja': '#FFA500',
        'Amarillo': '#FFFF00',
        'Verde': '#008000',
        'Azul': '#0000FF',
        'Violeta': '#8A2BE2',
        'Gris': '#808080',
        'Blanco': '#FFFFFF',
        'Dorado': '#FFD700',
        'Plateado': '#C0C0C0'
    };
    return colorMap[colorName] || '#000000';
}
function getMultiplierColor(multiplier) {
    const multiplierColors = {
        1: 'Negro',
        10: 'Marrón',
        100: 'Rojo',
        1000: 'Naranja',
        10000: 'Amarillo',
        100000: 'Verde',
        1000000: 'Azul'
    };
    return multiplierColors[multiplier] || 'No definido';
}
function getToleranceColor(tolerance) {
    const toleranceColors = {
        20: 'Sin banda',
        10: 'Plateado',
        5: 'Dorado',
        2: 'Rojo',
        1: 'Marrón',
        0.5: 'Verde',
        0.25: 'Azul',
        0.1: 'Violeta'
    };
    return toleranceColors[tolerance] || 'Dorado';
}
function clearColorCode() {
    const selects = document.querySelectorAll('#color-code-section select');
    selects.forEach(select => select.selectedIndex = 0);
    
    // Limpiar bandas visuales
    for (let i = 1; i <= 6; i++) {
        const band = document.getElementById(`visual-band-${i}`);
        if (band) {
            band.className = 'band';
        }
    }
    
    // Limpiar resultados
    document.getElementById('color-result-value').textContent = '--';
    document.getElementById('resistance-value').textContent = '--';
    document.getElementById('tolerance-value').textContent = '--';
    document.getElementById('range-value').textContent = '--';
    
    // Limpiar coeficiente de temperatura específicamente
    const tempCoeffElement = document.getElementById('temp-coeff-value');
    if (tempCoeffElement) {
        tempCoeffElement.textContent = '--';
    }
    
    // Limpiar calculadora inversa
    document.getElementById('resistance-input').value = '';
    const tempCoeffInput = document.getElementById('temp-coeff-input');
    if (tempCoeffInput) {
        tempCoeffInput.value = '';
    }
    document.getElementById('suggested-colors').innerHTML = '--';
    
    // Ocultar sección de coeficiente de temperatura por defecto
    const tempCoeffContainer = document.getElementById('temp-coeff');
    if (tempCoeffContainer) {
        tempCoeffContainer.style.display = 'none';
    }
}
// =================================
// FUNCIONES DE CONVERSIÓN
// =================================
function convertVoltage(value, unit) {
    switch (unit) {
        case 'mV': return value / 1000;
        case 'kV': return value * 1000;
        case 'V':
        default: return value;
    }
}
function convertCurrent(value, unit) {
    switch (unit) {
        case 'mA': return value / 1000;
        case 'μA': return value / 1000000;
        case 'A':
        default: return value;
    }
}
function convertResistance(value, unit) {
    switch (unit) {
        case 'kΩ': return value * 1000;
        case 'MΩ': return value * 1000000;
        case 'Ω':
        default: return value;
    }
}
function convertLength(value, unit) {
    switch (unit) {
        case 'mm': return value / 1000;
        case 'cm': return value / 100;
        case 'km': return value * 1000;
        case 'm':
        default: return value;
    }
}
function convertArea(value, unit) {
    switch (unit) {
        case 'mm2': return value / 1000000;
        case 'cm2': return value / 10000;
        case 'm2':
        default: return value;
    }
}
// =================================
// FUNCIONES DE FORMATO
// =================================
function formatResult(value, unit) {
    if (Math.abs(value) >= 1000000) {
        return `${(value / 1000000).toFixed(3)} M${unit}`;
    } else if (Math.abs(value) >= 1000) {
        return `${(value / 1000).toFixed(3)} k${unit}`;
    } else if (Math.abs(value) >= 1) {
        return `${value.toFixed(3)} ${unit}`;
    } else if (Math.abs(value) >= 0.001) {
        return `${(value * 1000).toFixed(3)} m${unit}`;
    } else {
        return `${(value * 1000000).toFixed(3)} μ${unit}`;
    }
}
function formatResistanceValue(value) {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(2)} MΩ`;
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(2)} kΩ`;
    } else {
        return `${value.toFixed(2)} Ω`;
    }
}
// =================================
// NAVEGACIÓN SUAVE
// =================================
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

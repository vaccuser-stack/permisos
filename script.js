// Variables globales
let permisosData = [];
let filteredData = [];
let currentPage = 1;
const recordsPerPage = 20;

// Elementos del DOM
const searchTypeSelect = document.getElementById('searchType');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const showAllBtn = document.getElementById('showAllBtn');
const resultsTable = document.getElementById('resultsTable');
const resultsBody = document.getElementById('resultsBody');
const resultsCount = document.getElementById('resultsCount');
const paginationInfo = document.getElementById('paginationInfo');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');
const loadingModal = document.getElementById('loadingModal');

// Función para mostrar/ocultar modal de carga
function showLoading(show = true) {
    loadingModal.style.display = show ? 'flex' : 'none';
}

// Función para parsear CSV
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(';');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(';');
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header.trim()] = values[index] ? values[index].trim() : '';
                });
                data.push(row);
            }
        }
    }
    
    return data;
}

// Función para cargar datos del CSV
async function loadData() {
    try {
        showLoading(true);
        
        const response = await fetch('PERMISOS.csv');
        if (!response.ok) {
            throw new Error('Error al cargar el archivo CSV');
        }
        
        const csvText = await response.text();
        permisosData = parseCSV(csvText);
        filteredData = [...permisosData];
        
        console.log(`Cargados ${permisosData.length} registros`);
        
        // Mostrar todos los datos inicialmente
        displayResults();
        
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Error al cargar los datos. Asegúrese de que el archivo PERMISOS.csv esté en la misma carpeta.');
    } finally {
        showLoading(false);
    }
}

// Función para filtrar datos
function filterData() {
    const searchType = searchTypeSelect.value;
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        filteredData = [...permisosData];
    } else {
        filteredData = permisosData.filter(row => {
            const fieldValue = row[getFieldName(searchType)] || '';
            return fieldValue.toLowerCase().includes(searchTerm);
        });
    }
    
    currentPage = 1;
    displayResults();
}

// Función para obtener el nombre del campo según el tipo de búsqueda
function getFieldName(searchType) {
    const fieldMap = {
        'nombre': 'NOMBRECOMPLETO',
        'matricula': 'MATRICULA',
        'carrera': 'CARRERA',
        'grupo': 'GRUPO'
    };
    return fieldMap[searchType] || 'NOMBRECOMPLETO';
}

// Función para mostrar resultados
function displayResults() {
    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    
    // Actualizar información de resultados
    resultsCount.textContent = `${totalRecords} resultado${totalRecords !== 1 ? 's' : ''} encontrado${totalRecords !== 1 ? 's' : ''}`;
    
    // Calcular registros para la página actual
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
    const pageData = filteredData.slice(startIndex, endIndex);
    
    // Actualizar información de paginación
    paginationInfo.textContent = `Mostrando ${startIndex + 1} a ${endIndex} de ${totalRecords} registros`;
    
    // Actualizar botones de paginación
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Generar números de página
    generatePageNumbers(totalPages);
    
    // Limpiar tabla
    resultsBody.innerHTML = '';
    
    // Llenar tabla con datos
    pageData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.MATRICULA || ''}</td>
            <td>${row.NOMBRECOMPLETO || ''}</td>
            <td>${row.CARRERA || ''}</td>
            <td>${row.GRUPO || ''}</td>
            <td>${row.PERIODO || ''}</td>
            <td>${row['QUIEN LO TRAMITA'] || ''}</td>
            <td>${row.PARENTESCO || ''}</td>
            <td>${row['TOTAL DE DIAS'] || ''}</td>
            <td>${row.DESDE || ''}</td>
            <td>${row.HASTA || ''}</td>
            <td>${row.JUSTIFICACION || ''}</td>
            <td>${row.FOLIO || ''}</td>
        `;
        resultsBody.appendChild(tr);
    });
}

// Función para generar números de página
function generatePageNumbers(totalPages) {
    pageNumbers.innerHTML = '';
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `btn btn-page ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        pageNumbers.appendChild(pageBtn);
    }
}

// Función para ir a una página específica
function goToPage(page) {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayResults();
    }
}

// Función para limpiar búsqueda
function clearSearch() {
    searchInput.value = '';
    filteredData = [...permisosData];
    currentPage = 1;
    displayResults();
}

// Función para mostrar todos los registros
function showAll() {
    searchInput.value = '';
    filteredData = [...permisosData];
    currentPage = 1;
    displayResults();
}

// Función para manejar búsqueda con Enter
function handleSearch() {
    filterData();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos al iniciar
    loadData();
    
    // Event listeners para botones
    searchBtn.addEventListener('click', handleSearch);
    clearBtn.addEventListener('click', clearSearch);
    showAllBtn.addEventListener('click', showAll);
    
    // Event listener para Enter en el input de búsqueda
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Event listeners para paginación
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
    
    // Event listener para cambio de tipo de búsqueda
    searchTypeSelect.addEventListener('change', function() {
        searchInput.placeholder = `Buscar por ${this.options[this.selectedIndex].text.toLowerCase()}...`;
        searchInput.focus();
    });
    
    // Establecer placeholder inicial
    searchInput.placeholder = 'Buscar por nombre...';
});

// Función para exportar resultados (bonus)
function exportResults() {
    if (filteredData.length === 0) {
        alert('No hay datos para exportar');
        return;
    }
    
    const headers = Object.keys(filteredData[0]);
    const csvContent = [
        headers.join(','),
        ...filteredData.map(row => 
            headers.map(header => `"${row[header] || ''}"`).join(',')
        )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'permisos_filtrados.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

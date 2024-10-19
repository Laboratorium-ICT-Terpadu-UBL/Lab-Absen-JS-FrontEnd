const chartFormater = (data) => {
    const statistik = {
        tahun_masuk: {
            data: [],
            total: 0
        },
        jenis_kelamin: {
            data: [],
            total: 0
        },
        jabatan: {
            data: [],
            total: 0
        },
        fakultas: {

        }
    }

    const tahunSekarang = new Date().getFullYear();

    // Hitung tahun 3 tahun ke belakang
    const tahunAwal = tahunSekarang - 4;

    // Filter asisten yang tahun masuknya dalam 3 tahun terakhir dan statusnya aktif
    const asistenAktif = data?.filter(asisten => parseInt(asisten.nim.substring(0, 2)) + 2000 >= tahunAwal && parseInt(asisten.nim.substring(0, 2)) + 2000 <= tahunSekarang && asisten.status === 'Aktif');

    // Fungsi untuk menghitung statistik jenis kelamin
    function hitungJenisKelamin() {
        const jenisKelaminMap = new Map();
        asistenAktif.forEach(asisten => {
            jenisKelaminMap.set(asisten.jenis_kelamin, (jenisKelaminMap.get(asisten.jenis_kelamin) || 0) + 1);
        });
        jenisKelaminMap.forEach((value, key) => {
            statistik.jenis_kelamin.data.push({ value, label: key });
            statistik.jenis_kelamin.total += value;
        });
    }

    // Fungsi untuk menghitung statistik tahun masuk
    function hitungTahunMasuk() {
        const tahunMasukMap = new Map();
        asistenAktif.forEach(asisten => {
            tahunMasukMap.set((parseInt(asisten.nim.substring(0, 2)) + 2000).toString(), (tahunMasukMap.get((parseInt(asisten.nim.substring(0, 2)) + 2000).toString()) || 0) + 1);
        });
        tahunMasukMap.forEach((value, key) => {
            statistik.tahun_masuk.data.push({ value, label: key });
            statistik.tahun_masuk.total += value;
        });
    }

    // Fungsi untuk menghitung statistik jabatan
    function hitungJabatan() {
        const jabatanMap = new Map();
        asistenAktif.forEach(asisten => {
            jabatanMap.set(asisten.jabatan, (jabatanMap.get(asisten.jabatan) || 0) + 1);
        });
        jabatanMap.forEach((value, key) => {
            statistik.jabatan.data.push({ value, label: key });
            statistik.jabatan.total += value;
        });
    }

    // Fungsi untuk menghitung statistik fakultas
    function hitungFakultas() {
        asistenAktif.forEach(asisten => {
            const fakultasKey = asisten.fakultas.toLowerCase().replace(/ /g, '_');
            if (!statistik.fakultas[fakultasKey]) {
                statistik.fakultas[fakultasKey] = { data: [] };
            }
            const fakultasIndex = statistik.fakultas[fakultasKey].data.findIndex(item => item.name === asisten.fakultas);
            if (fakultasIndex !== -1) {
                const jurusanKey = asisten.jurusan.toLowerCase().replace(/ /g, '_');
                if (statistik.fakultas[fakultasKey].data[fakultasIndex][jurusanKey] === undefined) {
                    statistik.fakultas[fakultasKey].data[fakultasIndex][jurusanKey] = 0;
                }
                statistik.fakultas[fakultasKey].data[fakultasIndex][jurusanKey]++;
            } else {
                const newData = { name: asisten.fakultas };
                newData[asisten.jurusan.toLowerCase().replace(/ /g, '_')] = 1;
                statistik.fakultas[fakultasKey].data.push(newData);
            }
        });
    }

    // Hitung statistik untuk setiap kategori
    hitungJenisKelamin();
    hitungTahunMasuk();
    hitungJabatan();
    hitungFakultas();

    return statistik
}

export default chartFormater
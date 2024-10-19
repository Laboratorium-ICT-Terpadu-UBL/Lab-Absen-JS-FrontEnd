export const homedata = {
    jumlah_asisten_aktif: 2,
    jumlah_calon_asisten_aktif: 3,
    jumlah_presensi: {
        asisten: 1,
        calon_asisten: 2,
    },
    jumlah_izin: {
        asisten: 0,
        calon_asisten: 1,
    }
}

export const chartData = {
    tahun_masuk: {
        data: [
            { value: 20, label: '2020' },
            { value: 16, label: '2021' },
            { value: 9, label: '2022' },
            { value: 20, label: '2023' },
        ],
        total: 65
    },
    jenis_kelamin: {
        data: [
            { value: 59, label: 'Laki-laki' },
            { value: 10, label: 'Perempuan' },
        ],
        total: 69
    },
    jabatan: {
        data: [
            { value: 14, label: 'Supervisor' },
            { value: 31, label: 'Asisten' },
            { value: 24, label: 'Calon Asisten' },
        ],
        total: 69
    },
    fakultas: {
        fakultas_teknologi_informasi: {
            data: [
                {
                    name: 'Fakultas Teknologi Informasi',
                    teknik_informatika: 47,
                    sistem_informasi: 12,
                    sistem_komputer: 20
                }
            ]
        },
        fakultas_ekonomi: {
            data: [
                {
                    name: 'Fakultas Ekonomi',
                    managemen: 5,
                    akuntansi: 4,
                }
            ]
        },
        fakultas_teknik: {
            data: [
                {
                    name: 'Fakultas Teknik',
                    arsitektur: 0,
                    teknik_lektro: 0
                }
            ]
        },
        fakultas_ilmu_sosial_dan_ilmu_politik: {
            data: [
                {
                    name: 'Fakultas Ilmu Sosial & Politik',
                    hubungan_internasional: 0,
                    kriminologi: 0
                }
            ]
        }
    }
}
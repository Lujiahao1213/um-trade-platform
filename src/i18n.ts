import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    welcome: "Welcome to UM Second-hand Trading Platform",
                    nav: {
                        home: "Trade",
                        sell: "Sell Item",
                        login: "Login",
                        logout: "Sign Out",
                        profile: "Profile"
                    },
                    home: {
                        title: "Zero Waste, Infinite Value",
                        subtitle: "The official second-hand trading platform for UM students. Safe, fast, and sustainable.",
                        searchPlaceholder: "Search for textbooks, gadgets...",
                        noItems: "No items found",
                        loading: "Loading items...",
                        tryAdjusting: "Try adjusting your search or category."
                    },
                    filters: {
                        All: "All",
                        Books: "Books",
                        Electronics: "Electronics",
                        Fashion: "Fashion",
                        Others: "Others"
                    },
                    sell: {
                        description: "Description",
                        descPlaceholder: "Describe the condition, reason for selling..."
                    },
                    item: {
                        description: "Description"
                    },
                    profile: {
                        title: "My Profile",
                        myListings: "My Listings",
                        noListings: "You haven't listed anything yet.",
                        delete: "Delete",
                        confirmDelete: "Are you sure you want to delete this item?",
                        uploadAvatar: "Upload Photo",
                        editAvatar: "Edit Feature"
                    }
                }
            },
            zh: {
                translation: {
                    welcome: "欢迎来到UM二手交易平台",
                    nav: {
                        home: "交易",
                        sell: "出售闲置",
                        login: "登录",
                        logout: "退出",
                        profile: "个人中心"
                    },
                    home: {
                        title: "零废弃，无限价值",
                        subtitle: "马大官方二手交易平台。安全、快捷、可持续。",
                        searchPlaceholder: "搜索课本、电子产品...",
                        noItems: "未找到商品",
                        loading: "加载中...",
                        tryAdjusting: "尝试调整搜索或分类。"
                    },
                    filters: {
                        All: "全部",
                        Books: "书籍",
                        Electronics: "电子产品",
                        Fashion: "时尚",
                        Others: "其他"
                    },
                    sell: {
                        description: "商品描述",
                        descPlaceholder: "请描述物品的新旧程度、出售原因..."
                    },
                    item: {
                        description: "商品详情"
                    },
                    profile: {
                        title: "个人中心",
                        myListings: "我的发布",
                        noListings: "您还没有发布任何商品。",
                        delete: "删除",
                        confirmDelete: "确定要删除这个商品吗？",
                        uploadAvatar: "上传头像",
                        editAvatar: "编辑头像"
                    }
                }
            },
            ms: {
                translation: {
                    welcome: "Selamat datang ke Platform Perdagangan Terpakai UM",
                    nav: {
                        home: "Perdagangan",
                        sell: "Jual Barang",
                        login: "Log Masuk",
                        logout: "Log Keluar",
                        profile: "Profil"
                    },
                    home: {
                        title: "Sifar Sisa, Nilai Tanpa Had",
                        subtitle: "Platform perdagangan terpakai rasmi untuk pelajar UM. Selamat, pantas, dan mampan.",
                        searchPlaceholder: "Cari buku teks, gajet...",
                        noItems: "Tiada barang dijumpai",
                        loading: "Memuatkan barang...",
                        tryAdjusting: "Cuba ubah carian atau kategori anda."
                    },
                    filters: {
                        All: "Semua",
                        Books: "Buku",
                        Electronics: "Elektronik",
                        Fashion: "Fesyen",
                        Others: "Lain-lain"
                    },
                    sell: {
                        description: "Penerangan",
                        descPlaceholder: "Terangkan keadaan barang, sebab jualan..."
                    },
                    item: {
                        description: "Penerangan Produk"
                    },
                    profile: {
                        title: "Profil Saya",
                        myListings: "Senarai Saya",
                        noListings: "Anda belum menyenaraikan apa-apa.",
                        delete: "Padam",
                        confirmDelete: "Adakah anda pasti mahu memadamkan item ini?",
                        uploadAvatar: "Muat Naik Foto",
                        editAvatar: "Edit Foto"
                    }
                }
            }
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;

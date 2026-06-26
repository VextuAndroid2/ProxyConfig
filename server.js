const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const MI_IP = "190.107.209.205";
const API_SECRET = "CLAVE_SEGURA_123";

app.set('trust proxy', true);
app.disable('x-powered-by');

app.use((req, res, next) => {
    const userAgent = req.headers['user-agent'] || "";
    const isBrowser = /Mozilla|AppleWebKit|Chrome|Safari|Firefox|Edg/i.test(userAgent);
    const authHeader = req.headers['x-api-key'];

    if (isBrowser && authHeader !== API_SECRET) {
        return res.status(401).end();
    }
    next();
});

const sendResponse = (req, res) => {
    const response = {
        "abhotupdate_cdn_url": `http://${MI_IP}:5000/cdn/live/ABHotUpdates/`,
        "abhotupdate_check": "cache_res;assetindexer;SH-Gpp",
        "appstore_url": "https://whatsapp.com/channel/0029VavQZlNElagy5Z13in2a",
        "backup_appstore_url": "https://whatsapp.com/channel/0029VavQZlNElagy5Z13in2a",
        "backup_cdn_url": "https://dl.cdn.freefiremobile.com/live/ABHotUpdates/",
        "billboard_bg_url": "https://i.ibb.co/m5SHgKs9/file-00000000305c720ebd5cba80a9cb2b44.png",
        "billboard_cdn_url": "https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi101.ff_extend",
        "billboard_msg": "",
        "cdn_active": "HS PESCOÇO",
        "cdn_port": 3000,
        "cdn_url": "https://dl.cdn.freefiremobile.com/live/ABHotUpdates/",
        "client_ip": MI_IP,
        "code": 0,
        "core_ip_list": ["0.0.0.0", "50.109.27.134", "129.226.2.163"],
        "core_url": "csoversea.castle.freefiremobile.com",
        "country_code": "US",
        "force_refresh_restype": "optionalavatarres",
        "gamevar": "EnableVariableFFVoiceIDC,EnableVariableFFVoiceIDC,bool,false,,",
        "garena_hint": false,
        "garena_login": true,
        "gdpr_version": 0,
        "ggp_url": "na-gin.freefiremobile.com",
        "gop_url": "",
        "hs_config": { "nome": "HS PESCOÇO", "porta": 3000 },
        "img_cdn_url": "https://dl.cdn.freefiremobile.com/common/",
        "is_firewall_open": true,
        "is_review_server": false,
        "is_server_open": true,
        "latest_release_version": "OB54",
        "login_download_optionalpack": "optionalclothres:shaders|optionalpetres:optionalpetres_commonab_shader",
        "login_failed_count": 2,
        "max_store": "",
        "max_video": "",
        "max_web": "",
        "min_hint_size": 1,
        "multi_region": "",
        "need_check_ip_list": [],
        "need_track_hotupdate": true,
        "network_log_server": "https://sgnetwork.ggblueshark.com/",
        "patchnote_url": "https://i.ibb.co/m5SHgKs9/file-00000000305c720ebd5cba80a9cb2b44.png",
        "remote_option_version": "optionallocres:49|optionalavatarres:674",
        "remote_option_version_astc": "optionallocres:49|optionalavatarres:677",
        "remote_version": "1.126.3",
        "server_url": "https://loginbp.ggpolarbear.com/",
        "should_check_ab_load": false,
        "space_required_in_GB": 1.48,
        "test_url": "",
        "use_background_download": true,
        "use_background_download_lobby": true,
        "use_login_optional_download": true,
        "web_log_server": "https://networkselftest.ff.garena.com/api/",
        "web_url": ""
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
};

app.all('/', sendResponse);

app.use((req, res) => {
    res.status(503).end();
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en ${PORT}`);
});

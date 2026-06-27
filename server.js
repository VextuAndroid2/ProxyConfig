const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const MI_IP = "190.107.209.205";
const API_SECRET = "VEXTUPROXY11";

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
const handleRequest = (req, res) => {
    const now = new Date().toLocaleTimeString();
    const clientIp = req.ip || req.connection.remoteAddress;
    const fullUrl = req.url;

    const userAgent = req.headers['user-agent'] || "";
    const isBrowser = /Mozilla|AppleWebKit|Chrome|Safari|Firefox|Edg/i.test(userAgent);
    const authHeader = req.headers['x-api-key'];

    if (isBrowser && authHeader !== API_SECRET) {
        return res.status(401).end();
    }
    console.log(`\n[${now}] PETICIÓN → ${req.method} ${fullUrl}`);
    const uid = req.query.uid || req.query.user_id || req.query.id || "No UID";
    console.log("🔑 UID:", uid);

    if (fullUrl.includes('login') || fullUrl.includes('auth') || fullUrl.includes('lobby') || 
        fullUrl.includes('facebook') || fullUrl.includes('account') || fullUrl.includes('server_url')) {
        console.log("🚫 LOGIN DETECTADO → Bloqueando con 403");
        return res.status(403).json({
            "status": "error",
            "code": 503,
            "message": "Login bloqueado por Proxy de Prueba"
        });
    }

    if (fullUrl.includes('/cdn/live/ABHotUpdates/')) {
        return res.json({ "status": "ok", "files": [] });
    }

    const response = {
        "abhotupdate_cdn_url": `http://213.199.53.16:1020/cdn/live/ABHotUpdates/`,
        "abhotupdate_check": "cache_res;assetindexer;SH-Gpp",
        "appstore_url": "https://whatsapp.com/channel/0029VavQZlNElagy5Z13in2a",
        "backup_appstore_url": "https://whatsapp.com/channel/0029VavQZlNElagy5Z13in2a",
        "backup_cdn_url": "https://dl.cdn.freefiremobile.com/live/ABHotUpdates/",
        "billboard_bg_url": "https://i.ibb.co/m5SHgKs9/file-00000000305c720ebd5cba80a9cb2b44.png",
        "billboard_cdn_url": "https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi101.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi102.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi103.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi104.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi105.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi106.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi107.ff_extend",
        "billboard_msg": "",
        "cdn_port": 3000,
        "cdn_url": "https://dl.cdn.freefiremobile.com/live/ABHotUpdates/",
        "client_ip": MI_IP,
        "code": 0,
        "core_ip_list": ["0.0.0.0", "50.109.27.134", "129.226.2.163", "129.226.1.13", "129.226.1.16"],
        "core_url": "csoversea.castle.freefiremobile.com",
        "country_code": "US",
        "force_refresh_restype": "optionalavatarres",
        "gamevar":"var_name,comment,var_type,var_value,var_region,var_platform\nEnableVariableFFVoiceIDC,EnableVariableFFVoiceIDC,bool,false,,\nEnableYieldMutexDuringAsyncLoad,EnableYieldMutexDuringAsyncLoad,bool,false,,\nNinthProgressLoadingDuration,NinthProgressLoadingDuration,float,0,,\nIsUseMedkitForceStand,IsUseMedkitForceStand,bool,false,,\nAutoEnemyMarkSwitch,AutoEnemyMarkSwitch,int,2,,\nReleaseMemForMatchEndFor3I3A,ReleaseMemForMatchEndFor3I3A,bool,false,,\nEnableFFOPortingHDAnimation,EnableFFOPortingHDAnimation,bool,false,,\nEnableReportIOFailedLogs,EnableReportIOFailedLogs,bool,false,,\nPGSRecallReadIPRegions_Mobile,PGSRecallReadIPRegions_Mobile,string,,,\nPGSRecallReadIPRegions_HPE,PGSRecallReadIPRegions_HPE,string,,,\nPGSRecallWriteIPRegions_Mobile,PGSRecallWriteIPRegions_Mobile,string,,,\nPGSRecallWriteIPRegions_HPE,PGSRecallWriteIPRegions_HPE,string,,,\nEnableFileInfoEncryptionIOS,EnableFileInfoEncryptionIOS,bool,TRUE,SG,\nEnableFileInfoEncryptionAndroid,EnableFileInfoEncryptionAndroid,bool,TRUE,SG,"
        "garena_hint": false,
        "garena_login": true,
        "gdpr_version": 0,
        "ggp_url": "na-gin.freefiremobile.com",
        "gop_url": "",
        "hs_config": { "nome": "HS PESCOÇO", "porta": 3000 },
        "img_cdn_url": "https://dl.cdn.freefiremobile.com/common/",
        "is_firewall_open": false,
        "is_review_server": false,
        "is_server_open": true,
        "latest_release_version": "OB54",
        "login_download_optionalpack": "optionalclothres:shaders|optionalpetres:optionalpetres_commonab_shader|optionallobbyres:",
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
        "remote_option_version": "optionallocres:49|optionalavatarres:674|optionalclothres:1107|optionalfootballres:47|optionalfullscreencgres:334|optionalhuntinggroundres:178|optionalinfection:121|optionalingameres:469|optionallobbyres:582|optionalallonewolfres:77|optionalallonewolfstrikeoutres:23|optionalalludores:40|optionalmap1res:385|optionalmap2res:125|optionalmap4res:110|optionalmaphippores:88|optionalmapres:340|optionalnewblast:138|optionalpetres:809|optionalrushb:123|optionalrushingpetsres:88|optionalsnowduelres:59|optionaltrainingres:83|optionalugcres:502|optionalvoiceres:352|optionalwerewolves:173|optionalmapponyres:200|optionalsocialres:111|optionalwerunres:83|optionalugcoldparadiseres:32|optionalmultiregionres:25",
        "remote_option_version_astc": "optionallocres:49|optionalavatarres:677|optionalclothres:1107|optionalfootballres:38|optionalfullscreencgres:318|optionalhuntinggroundres:178|optionalinfection:116|optionalingameres:438|optionallobbyres:564|optionallonewolfres:139|optionallonewolfstrikeoutres:96|optionalludores:144|optionalmap1res:385|optionalmap2res:159|optionalmap4res:144|optionalmaphippores:89|optionalmapres:374|optionalnewblast:138|optionalpetres:809|optionalrushb:227|optionalrushingpetsres:192|optionalsnowduelres:59|optionaltrainingres:79|optionalugcres:472|optionalvoiceres:385|optionalwerewolves:277|optionalmapponyres:200|optionalsocialres:106|optionalwerunres:74|optionalugcoldparadiseres:32|optionalmultiregionres:26",
        "remote_version": "1.126.5",
        "server_url": "https://loginbp.ggpolarbear.com/",
        "should_check_ab_load": false,
        "space_required_in_GB": 1.48,
        "test_url": "",
        "use_background_download": false,
        "use_background_download_lobby": false,
        "use_login_optional_download": true,
        "web_log_server": "https://networkselftest.ff.garena.com/api/",
        "web_url": ""
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response);
};

app.all('/', handleRequest);
app.all('/ver.php', handleRequest);

app.use((req, res) => {
    res.status(204).end();
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ SERVIDOR ACTIVO`);
    console.log(`🔴 Mantén Termux abierto`);
});

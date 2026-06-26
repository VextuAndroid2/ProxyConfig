const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Tu IP actual (cámbiala si cambia)
const MI_IP = "190.107.209.205";

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use((req, res, next) => {
    const now = new Date().toISOString();

    console.log("\n========== REQUEST ==========");
    console.log("Hora:", now);
    console.log("IP:", req.ip || req.socket.remoteAddress);
    console.log("Método:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Path:", req.path);
    console.log("Query:", JSON.stringify(req.query, null, 2));
    console.log("Headers:");
    console.log(req.headers);
    console.log("Body:");
    console.log(req.body);
    console.log("=============================\n");

    next();
});

app.use((req, res, next) => {
    const send = res.send;
    const json = res.json;

    res.send = function(data) {
        console.log("===== RESPONSE SEND =====");
        console.log(data);
        return send.call(this, data);
    };

    res.json = function(data) {
        console.log("===== RESPONSE JSON =====");
        console.log(JSON.stringify(data, null, 2));
        return json.call(this, data);
    };

    next();
});

app.use((req, res) => {
    const now = new Date().toLocaleTimeString();
    const clientIp = req.ip || req.connection.remoteAddress;
    const fullUrl = req.url;
    
    console.log(`\n[${now}] PETICIÓN → ${req.method} ${fullUrl}`);

    const uid = req.query.uid || req.query.user_id || req.query.id || "No UID";
    console.log("🔑 UID:", uid);

    // === PRIMERA PETICIÓN (la más importante) ===
    if (fullUrl.includes('/ver.php')) {
    console.log("✅ Petición (/ver.php) detectada");
    
    // Permitir tanto la pública como la local (ajusta la local a la tuya)
    const IP_LOCAL = "192.168.100.3"; 
    
    if (clientIp !== MI_IP && clientIp !== IP_LOCAL && !clientIp.includes(IP_LOCAL)) {
         console.log(`❌ IP RECHAZADA: ${clientIp} (Esperaba: ${MI_IP} o ${IP_LOCAL})`);
         res.status(404).send("Unauthorized Ip");
         return;
    }
    console.log("✅ IP Autorizada");
}
    // === BLOQUEO DE LOGIN ===
    if (fullUrl.includes('login') || fullUrl.includes('auth') || fullUrl.includes('guest') || 
        fullUrl.includes('facebook') || fullUrl.includes('account') || fullUrl.includes('server_url')) {
        
        console.log("🚫 LOGIN DETECTADO → Bloqueando con 403");
        res.status(403).json({
            "status": "error",
            "code": 403,
            "message": "Login bloqueado por Proxy de Prueba"
        });
        return;
    }

    // Respuesta CDN
    if (fullUrl.includes('/cdn/live/ABHotUpdates/')) {
        res.json({ "status": "ok", "files": [] });
        return;
    }

    // Respuesta principal (idéntica al CURL)
    const response = {
        "abhotupdate_cdn_url":`http://${MI_IP}:5000/cdn/live/ABHotUpdates/`,
        "abhotupdate_check":"cache_res;assetindexer;SH-Gpp",
        "appstore_url":"https://whatsapp.com/channel/0029VavQZlNElagy5Z13in2a",
        "backup_appstore_url":"https://whatsapp.com/channel/0029VavQZlNElagy5Z13in2a",
        "backup_cdn_url":"https://dl.cdn.freefiremobile.com/live/ABHotUpdates/",
        "billboard_bg_url":"https://dl.cdn.freefiremobile.com/common/OB23/version/Patch_Bg.png",
        "billboard_cdn_url":"https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi101.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi102.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi103.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi104.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi105.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi106.ff_extend;https://dl.dir.freefiremobile.com/common/OB54/CSH/patchupdate/sgolzjifnmi107.ff_extend",
        "billboard_msg":"",
        "cdn_active":"HS PESCOÇO",
        "cdn_port":3000,
        "cdn_url":"https://dl.cdn.freefiremobile.com/live/ABHotUpdates/",
        "client_ip": MI_IP,
        "code":0,
        "core_ip_list":["0.0.0.0","50.109.27.134","129.226.2.163","129.226.1.13","129.226.1.16"],
        "core_url":"csoversea.castle.freefiremobile.com",
        "country_code":"US",
        "force_refresh_restype":"optionalavatarres",
        "gamevar":"var_name,comment,var_type,var_value,var_region,var_platform\nvar_name,comment,var_type,var_value,var_region,var_platform\nEnableVariableFFVoiceIDC,EnableVariableFFVoiceIDC,bool,false,,",
        "garena_hint":false,
        "garena_login":true,
        "gdpr_version":0,
        "ggp_url":"na-gin.freefiremobile.com",
        "gop_url":"",
        "hs_config":{"nome":"HS PESCOÇO","porta":3000},
        "img_cdn_url":"https://dl.cdn.freefiremobile.com/common/",
        "is_firewall_open":false,
        "is_review_server":false,
        "is_server_open":true,
        "latest_release_version":"OB54",
        "login_download_optionalpack":"optionalclothres:shaders|optionalpetres:optionalpetres_commonab_shader|optionallobbyres:",
        "login_failed_count":2,
        "max_store":"",
        "max_video":"",
        "max_web":"",
        "min_hint_size":1,
        "multi_region":"",
        "need_check_ip_list":[],
        "need_track_hotupdate":true,
        "network_log_server":"https://sgnetwork.ggblueshark.com/",
        "patchnote_url":"https://dl.dir.freefiremobile.com/common/web_event/aswqooiwd/zClWsKYO.html?lang=en",
        "remote_option_version":"optionallocres:49|optionalavatarres:674|optionalclothres:1107|optionalfootballres:47|optionalfullscreencgres:334|optionalhuntinggroundres:178|optionalinfection:121|optionalingameres:469|optionallobbyres:582|optionallonewolfres:77|optionallonewolfstrikeoutres:23|optionalludores:40|optionalmap1res:385|optionalmap2res:125|optionalmap4res:110|optionalmaphippores:88|optionalmapres:340|optionalnewblast:138|optionalpetres:809|optionalrushb:123|optionalrushingpetsres:88|optionalsnowduelres:59|optionaltrainingres:83|optionalugcres:502|optionalvoiceres:352|optionalwerewolves:173|optionalmapponyres:200|optionalsocialres:111|optionalwerunres:83|optionalugcoldparadiseres:32|optionalmultiregionres:25",
        "remote_option_version_astc":"optionallocres:49|optionalavatarres:677|optionalclothres:1107|optionalfootballres:38|optionalfullscreencgres:318|optionalhuntinggroundres:178|optionalinfection:116|optionalingameres:438|optionallobbyres:564|optionallonewolfres:139|optionallonewolfstrikeoutres:96|optionalludores:144|optionalmap1res:385|optionalmap2res:159|optionalmap4res:144|optionalmaphippores:89|optionalmapres:374|optionalnewblast:138|optionalpetres:809|optionalrushb:227|optionalrushingpetsres:192|optionalsnowduelres:59|optionaltrainingres:79|optionalugcres:472|optionalvoiceres:385|optionalwerewolves:277|optionalmapponyres:200|optionalsocialres:106|optionalwerunres:74|optionalugcoldparadiseres:32|optionalmultiregionres:26",
        "remote_version":"1.126.3",
        "server_url":"https://loginbp.ggpolarbear.com/",
        "should_check_ab_load":false,
        "space_required_in_GB":1.48,
        "test_url":"",
        "use_background_download":true,
        "use_background_download_lobby":true,
        "use_login_optional_download":true,
        "web_log_server":"https://networkselftest.ff.garena.com/api/",
        "web_url":""
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ SERVIDOR ACTIVO`);
    console.log(`📍 IP actual: http://${MI_IP}:5000/proxyprueba/`);
    console.log(`🔴 Mantén Termux abierto`);
});


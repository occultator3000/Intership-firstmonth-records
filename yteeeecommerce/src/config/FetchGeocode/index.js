import { AMapWebkey } from "../LocalAppData";

export async function fetchAddressByWebAPI(lat, lng) {
        const key = AMapWebkey; // 需在高德开放平台申请Web服务Key
        const url = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lng},${lat}&key=${key}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === '1' && data.regeocode && data.regeocode.formatted_address) {
                console.log('逆地理编码结果:', data);
                return data.regeocode.formatted_address;
            }
            return '未找到地址';
        } catch (e) {
            return '逆地理编码失败';
        }
    }

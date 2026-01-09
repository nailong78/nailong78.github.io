# 适配版云端执行器 (去掉了浏览器不支持的 subprocess 和本地环境依赖)
import micropip
import js

async def start():
    print("="*30)
    print("正在为 iOS 26 环境配置依赖...")
    
    try:
        # 在浏览器运行环境中安装 requests 的替代品 pyodide-http 或直接用标准库
        await micropip.install("requests")
        import requests
        
        # 配置信息
        USER = "nailong78"
        REPO = "-SMS-"
        LOG_FILE = "更新日志.txt"
        CODE_FILE = "Code.py"

        # 使用 jsdelivr 加速
        LOG_URL = f"https://cdn.jsdelivr.net/gh/{USER}/{REPO}@main/{LOG_FILE}"
        CODE_URL = f"https://cdn.jsdelivr.net/gh/{USER}/{REPO}@main/{CODE_FILE}"
        
        print("最新更新日志：")
        log_resp = requests.get(LOG_URL)
        log_resp.encoding = 'utf-8'
        if log_resp.status_code == 200:
            print(log_resp.text)
        else:
            print("未能获取到更新日志。")
        print("="*30 + "\n")

        print("正在同步云端指令...")
        code_resp = requests.get(CODE_URL)
        code_resp.encoding = 'utf-8'
        
        # 执行代码
        exec(code_resp.text, globals())

    except Exception as e:
        print(f"发生错误: {e}")
        print("提示：如果遇到跨域(CORS)错误，是因为GitHub禁止了浏览器直接请求原始代码。")

# 启动
import asyncio
asyncio.ensure_future(start())

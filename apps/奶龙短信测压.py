import micropip
import asyncio

async def main():
    print("="*30)
    print("🚀 正在加载 iOS 26 运行环境...")
    
    try:
        # 安装依赖
        await micropip.install("requests")
        import requests
        
        # 配置信息 (使用 jsdelivr 镜像彻底解决 Failed to fetch 报错)
        USER = "nailong78"
        REPO = "-SMS-"
        
        # 加上 @main 确保指向主分支，使用 fastly 加速
        LOG_URL = f"https://fastly.jsdelivr.net/gh/{USER}/{REPO}@main/更新日志.txt"
        CODE_URL = f"https://fastly.jsdelivr.net/gh/{USER}/{REPO}@main/Code.py"

        # 1. 获取日志
        print("正在同步云端日志...")
        log_resp = requests.get(LOG_URL)
        if log_resp.status_code == 200:
            log_resp.encoding = 'utf-8'
            print("\n【最新更新】")
            print(log_resp.text)
        
        # 2. 获取并执行代码
        print("\n正在拉取云端指令集...")
        code_resp = requests.get(CODE_URL)
        if code_resp.status_code == 200:
            code_resp.encoding = 'utf-8'
            print("同步完成，准备启动...\n")
            # 执行云端代码
            exec(code_resp.text, globals())
        else:
            print("错误：无法连接到云端指令集。")

    except Exception as e:
        print(f"\n❌ 运行出错: {e}")
        print("提示：请检查 -SMS- 仓库是否为 Public 公开状态。")

# 异步启动
asyncio.ensure_future(main())

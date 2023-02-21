import { init } from './init.mjs';
import { config } from 'dotenv';
import { task } from './task.mjs';
import { timing } from './timing.mjs';

// 加载env变量
await config();
// 加载数据库
await init();
// 加载定时任务
timing(task);

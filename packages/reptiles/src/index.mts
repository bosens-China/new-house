import { init } from '@new-house/database/init';
import { task } from './task.mjs';
import { timing } from './timing.mjs';

// 加载数据库
await init();
// 加载定时任务
timing(task);

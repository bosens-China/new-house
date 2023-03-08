// 缓存初始验证网络的html值

class Catch {
  private map = new Map<string, { value: string; runTime: number }>();
  private duration: number;
  constructor(duration = 1000 * 30) {
    this.duration = duration;
  }

  get(key: string) {
    const time = new Date().valueOf();
    for (const [name, value] of this.map) {
      if (name === key && time - value.runTime >= this.duration) {
        return value.value;
      }
    }
  }
}

export default Catch;

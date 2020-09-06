import { fork } from 'child_process';

const ChildProcessService = {
  delegate: (path, data, callback) => {
    const compute = fork(path);
    compute.send(data);
    compute.on('message', (preview) => {
      callback(preview);
      compute.kill('SIGINT');
    });
  }

};

export default ChildProcessService;

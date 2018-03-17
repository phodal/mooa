export default function create(program: any) {
  if (program.create === 'host') {
    console.log('create host')
  } else if (program.create === 'app') {
    console.log('create app')
  }
}

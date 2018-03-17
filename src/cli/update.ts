export default function update(program: any) {
  if (program.update === 'host') {
    console.log('update host')
  } else if (program.update === 'app') {
    console.log('update app')
  }
}

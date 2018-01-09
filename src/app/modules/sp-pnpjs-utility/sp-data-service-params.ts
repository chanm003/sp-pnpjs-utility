export class SPDataServiceParams {
    constructor(
        public top: number = 300,
        public orderBy: string = 'Title',
        public filter: string = '',
        public expand: string = ''
    ) { }
}

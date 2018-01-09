import { SharePointItem, select } from './sharepointitem.model';
import { parser } from './httpBodyParser';

export class SPModel extends SharePointItem {
    static listName: string;

    @select()
    @parser({ isReadOnly: false })
    Title: string;
}

import { Matcher } from '../matchers';
import { XmlNode } from './xmlNode';
export declare class XmlText extends XmlNode {
    private content;
    private matcher?;
    constructor(content: string, matcher?: Matcher<string> | undefined);
}

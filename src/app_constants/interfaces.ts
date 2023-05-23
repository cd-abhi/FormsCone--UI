import { ItemType } from "../utils/enums";

export interface QuestionType {
    questionTitle: string;
    description?: string;
    questionType: ItemType;
}
  
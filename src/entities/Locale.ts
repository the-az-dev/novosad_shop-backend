import { Column, Entity, OneToMany } from "typeorm";
import { TextI18n } from "./TextI18n";

@Entity("locale", { schema: "novosad-shop" })
export class Locale {
  @Column("varchar", { primary: true, name: "name", length: 10 })
  name: string;

  @OneToMany(() => TextI18n, (textI18n) => textI18n.locale2)
  textI18ns: TextI18n[];
}

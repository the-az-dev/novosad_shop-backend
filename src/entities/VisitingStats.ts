import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("visiting-stats", { schema: "novosad-shop" })
export class VisitingStats {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "visitors-cout" })
  visitorsCout: number;

  @Column("date", { name: "date", nullable: true })
  date: string | null;
}

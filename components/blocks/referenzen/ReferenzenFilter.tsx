"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Trade, ObjectType } from "@/lib/referenzen/types";
import { tradeLabels, objectTypeLabels } from "@/lib/referenzen/projects";
import type { ReactNode } from "react";

const ALL = "all";

type ReferenzenFilterProps = {
  tradeFilter: Trade | typeof ALL;
  objectTypeFilter: ObjectType | typeof ALL;
  onTradeChange: (value: Trade | typeof ALL) => void;
  onObjectTypeChange: (value: ObjectType | typeof ALL) => void;
  tradeOptions: Trade[];
  objectTypeOptions: ObjectType[];
};

export function ReferenzenFilter({
  tradeFilter,
  objectTypeFilter,
  onTradeChange,
  onObjectTypeChange,
  tradeOptions,
  objectTypeOptions,
}: ReferenzenFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-4 lg:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-[#313D5A]">Gewerk</label>
        <Select
          value={tradeFilter}
          onValueChange={(v) => onTradeChange(v as Trade | typeof ALL)}
        >
          <SelectTrigger className="w-[180px] border-[#E5E7EB] bg-[#FCFCFC] text-[#313D5A]">
            <SelectValue placeholder="Alle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Alle</SelectItem>
            {tradeOptions.map((t) => (
              <SelectItem key={t} value={t}>
                {tradeLabels[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-[#313D5A]">Objekttyp</label>
        <Select
          value={objectTypeFilter}
          onValueChange={(v) => onObjectTypeChange(v as ObjectType | typeof ALL)}
        >
          <SelectTrigger className="w-[180px] border-[#E5E7EB] bg-[#FCFCFC] text-[#313D5A]">
            <SelectValue placeholder="Alle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Alle</SelectItem>
            {objectTypeOptions.map((o) => (
              <SelectItem key={o} value={o}>
                {objectTypeLabels[o]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

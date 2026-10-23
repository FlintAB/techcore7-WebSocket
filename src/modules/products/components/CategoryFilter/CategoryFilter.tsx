import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import type { SelectChangeEvent } from "@mui/material/Select"
import { useId } from "react"

import type { ProductCategory } from "@/modules/products/types/products.types"

const ALL_CATEGORIES_VALUE = "all"

type CategoryFilterProps = {
   categories: ProductCategory[]
   value: string | null
   onChange: (category: string | null) => void
   isLoading?: boolean
}

export const CategoryFilter = ({
   categories,
   value,
   onChange,
   isLoading = false,
}: CategoryFilterProps) => {
   const labelId = useId()

   const handleChange = (event: SelectChangeEvent<string>) => {
      const nextValue = event.target.value

      onChange(nextValue === ALL_CATEGORIES_VALUE ? null : nextValue)
   }

   return (
      <FormControl
         size="small"
         disabled={isLoading}
         sx={{ minWidth: 240 }}
      >
         <InputLabel id={labelId}>Категория</InputLabel>

         <Select
            labelId={labelId}
            value={value ?? ALL_CATEGORIES_VALUE}
            label="Категория"
            onChange={handleChange}
         >
            <MenuItem value={ALL_CATEGORIES_VALUE}>
               Все категории
            </MenuItem>

            {categories.map((category) => (
               <MenuItem
                  key={category.slug}
                  value={category.slug}
               >
                  {category.name}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   )
}

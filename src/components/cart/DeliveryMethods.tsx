import { Cart } from "@/models/Cart";
import type { DeliveryMethodId } from "@/types/cart";
import { DELIVERY_METHODS } from "@/utils/constants";
import { formatPrice } from "@/utils/format";

interface DeliveryMethodsProps {
  value: DeliveryMethodId;
  amountAfterDiscount: number;
  onChange: (method: DeliveryMethodId) => void;
}

// Radio group: native inputs give keyboard support (arrow keys) and screen reader semantics for free.
export default function DeliveryMethods({ value, amountAfterDiscount, onChange }: DeliveryMethodsProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-sm font-semibold">Delivery method</legend>
      {DELIVERY_METHODS.map((method) => {
        const price = Cart.shippingFor(method.id, amountAfterDiscount);
        const selected = method.id === value;
        return (
          <label
            key={method.id}
            className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
              selected ? "border-brand bg-brand-soft dark:bg-surface-2" : "border-line hover:bg-surface-2"
            }`}
          >
            <input
              type="radio"
              name="delivery-method"
              value={method.id}
              checked={selected}
              onChange={() => onChange(method.id)}
              className="mt-1 size-4 accent-brand"
            />
            <span className="min-w-0 flex-1">
              <span className="flex justify-between gap-3 text-sm font-semibold">
                <span>{method.label}</span>
                <span className="tabular-nums">{price === 0 ? "Free" : formatPrice(price)}</span>
              </span>
              <span className="block text-xs text-muted">
                {method.eta} · {method.description}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

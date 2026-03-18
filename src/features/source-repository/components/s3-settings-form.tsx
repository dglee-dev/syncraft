"use client";

import React, { useState } from "react";
import clsx from "clsx";

type S3Settings = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
  prefix: string;
};

const REGIONS = [
  "ap-northeast-2",
  "ap-northeast-1",
  "ap-southeast-1",
  "us-east-1",
  "us-west-2",
  "eu-west-1",
];

const S3SettingsForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit?: (settings: S3Settings) => void;
  onCancel?: () => void;
}) => {
  const [form, setForm] = useState<S3Settings>({
    accessKeyId: "",
    secretAccessKey: "",
    region: "ap-northeast-2",
    bucket: "",
    prefix: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "bg-gray-800 text-white text-[0.85em]",
        "p-4 flex flex-col gap-3",
        "w-full"
      )}
    >
      <p className="text-amber-200 font-semibold text-[1.1em]">S3 연결 설정</p>

      <Field label="Access Key ID">
        <input
          name="accessKeyId"
          type="text"
          value={form.accessKeyId}
          onChange={handleChange}
          placeholder="AKIAIOSFODNN7EXAMPLE"
          required
        />
      </Field>

      <Field label="Secret Access Key">
        <input
          name="secretAccessKey"
          type="password"
          value={form.secretAccessKey}
          onChange={handleChange}
          placeholder="••••••••••••••••••••"
          required
        />
      </Field>

      <Field label="Region">
        <select name="region" value={form.region} onChange={handleChange}>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Bucket">
        <input
          name="bucket"
          type="text"
          value={form.bucket}
          onChange={handleChange}
          placeholder="my-bucket"
          required
        />
      </Field>

      <Field label="Prefix (폴더 경로)">
        <input
          name="prefix"
          type="text"
          value={form.prefix}
          onChange={handleChange}
          placeholder="uploads/images/"
        />
      </Field>

      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          className={clsx(
            "flex-1 py-1.5 bg-amber-200 text-gray-900 font-semibold",
            "hover:bg-amber-300 transition-colors"
          )}
        >
          연결
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={clsx(
              "flex-1 py-1.5 bg-gray-600 text-white",
              "hover:bg-gray-500 transition-colors"
            )}
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col gap-1">
    <span className="text-gray-400 text-[0.9em]">{label}</span>
    <div
      className={clsx(
        "[&_input]:w-full [&_input]:bg-gray-700 [&_input]:text-white",
        "[&_input]:px-2 [&_input]:py-1.5 [&_input]:outline-none",
        "[&_input:focus]:ring-1 [&_input:focus]:ring-amber-200",
        "[&_select]:w-full [&_select]:bg-gray-700 [&_select]:text-white",
        "[&_select]:px-2 [&_select]:py-1.5 [&_select]:outline-none",
        "[&_select:focus]:ring-1 [&_select:focus]:ring-amber-200"
      )}
    >
      {children}
    </div>
  </label>
);

export default S3SettingsForm;
